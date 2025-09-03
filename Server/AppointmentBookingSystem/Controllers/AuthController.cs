// This controller will handle registering users, logging them in, logging them out,
// and generating JWT tokens that are stored in HttpOnly cookies (safer than localStorage).

using AppointmentBookingSystem.DTO;
using AppointmentBookingSystem.Models;
using AppointmentBookingSystem.ViewModel;
using Azure;
using Humanizer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Xml;

namespace AppointmentBookingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager; //Handles users (ApplicationUser)

        private readonly RoleManager<IdentityRole> _roleManager; //Handles roles (Admin, User, etc.)
               
        private readonly IConfiguration _config;    // Used for JWT secret/issuer/audience

        public AuthController(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration config)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _config = config;
        }

        // AuthController.cs - Updated Register method with auto-login

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterVM model)
        {
            var response = new BaseResponseModel();
            try
            {
                var userExists = await _userManager.FindByEmailAsync(model.Email);
                if (userExists != null)
                {
                    response.Status = false;
                    response.StatusMessage = "User already exists!";
                    return BadRequest(response);
                }

                // Create new user
                var user = new ApplicationUser
                {
                    Email = model.Email,
                    UserName = model.Email,
                    Name = model.Name
                };

                // Uses Identity to create the user with hashed password.
                var result = await _userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                {
                    response.Status = false;
                    response.StatusMessage = "Password too weak: " + string.Join("; ", result.Errors.Select(e => e.Description));
                    return BadRequest(response);
                }

                // Check if role is valid
                if (!await _roleManager.RoleExistsAsync(model.Role))
                {
                    response.Status = false;
                    response.StatusMessage = $"The role '{model.Role}' is not valid.";
                    return BadRequest(response);
                }

                // Assign role
                await _userManager.AddToRoleAsync(user, model.Role);

                // AUTO-LOGIN: Generate tokens for the newly registered user
                var roles = await _userManager.GetRolesAsync(user);

                // Create claims for the JWT
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                // Add role claims
                foreach (var role in roles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, role));
                }

                // Generate Access Token (15 min)
                var accessToken = GetToken(authClaims, minutes: 15);
                var accessTokenString = new JwtSecurityTokenHandler().WriteToken(accessToken);

                // Generate Refresh Token (15 days, stateless JWT)
                var refreshClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var refreshToken = GetToken(refreshClaims, minutes: 60 * 24 * 15); // 15 days
                var refreshTokenString = new JwtSecurityTokenHandler().WriteToken(refreshToken);

                // Set refresh token in HttpOnly cookie
                Response.Cookies.Append("refreshToken", refreshTokenString, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = refreshToken.ValidTo
                });

                response.Status = true;
                response.StatusMessage = "User registered and logged in successfully!";
                response.Data = new
                {
                    accessToken = accessTokenString,
                    expiration = accessToken.ValidTo,
                    user = new
                    {
                        id = user.Id,
                        name = user.Name,
                        email = user.Email,
                        roles = roles.ToList()
                    }
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.StatusMessage = ex.Message;
                return BadRequest(response);
            }
        }

        // ✅ LOGIN USER (issue access + refresh tokens)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginVM model)
        {
            var response = new BaseResponseModel();

            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    response.Status = false;
                    response.StatusMessage = "User doesnt exist";
                    return Unauthorized(response);
                }
                // Check if user exists + password correct
                if (await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    // Get roles (needed for RBAC (role-based access))
                    var roles = await _userManager.GetRolesAsync(user);

                    // Create claims for the JWT (username, userId, roles, unique id)
                    var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Name, user.Name),   // 👈 custom Name from DB
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };

                    //Adds role claims(so JWT carries user’s role).
                    foreach (var role in roles)
                    {
                        authClaims.Add(new Claim(ClaimTypes.Role, role));
                    }
                    // 🔑 Generate Access Token (15 min)
                    var accessToken = GetToken(authClaims, minutes: 15);
                    var accessTokenString = new JwtSecurityTokenHandler().WriteToken(accessToken);

                    // 🔑 Generate Refresh Token (15 days, stateless JWT)
                    var refreshClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };

                    var refreshToken = GetToken(refreshClaims, minutes: 60 * 24 * 15); // 15 days
                    var refreshTokenString = new JwtSecurityTokenHandler().WriteToken(refreshToken);

                    // Set token in HttpOnly cookie (cannot be accessed by JS = safer!)
                    Response.Cookies.Append("refreshToken", refreshTokenString, new CookieOptions
                    {
                        HttpOnly = true,    //not accessible via JS → prevents XSS attacks.
                        Secure = true, //only sent over HTTPS.
                        SameSite = SameSiteMode.None,
                        Expires = refreshToken.ValidTo //cookie expires same as JWT
                    });

                    response.Status = true;
                    response.StatusMessage = "Login successful";
                    response.Data = new
                    {
                        accessToken = accessTokenString,
                        refreshToken= refreshTokenString,
                        expiration = accessToken.ValidTo,
                        user = new
                        {
                            id = user.Id,
                            name = user.Name,
                            email = user.Email,
                            roles = roles.ToList()
                        }
                    };

                    return Ok(response);
                }
                response.Status = false;
                response.StatusMessage = "Invalid credentials";
                return Unauthorized(response);
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.StatusMessage = "An error occurred while processing the request.";
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }
        
        
        // ✅ Refresh Access Token using Refresh Token Cookie
        [HttpPost("refresh")] //Refresh token only proves "I am the user X and my session is still valid".
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized("Refresh token missing");

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var principal = tokenHandler.ValidateToken(refreshToken, new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _config["JWT:ValidIssuer"],
                    ValidAudience = _config["JWT:ValidAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]))
                }, out SecurityToken validatedToken);

                // principal = ClaimsPrincipal extracted from token (represents the user)
                                // Extract only the userId (sub claim) from refresh token
                var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null)
                    return Unauthorized("Invalid refresh token");
                
                // Re-fetch user from DB
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                    return Unauthorized("User not found");

                // Rebuild claims (fresh from DB)
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.UserName)
                };

                foreach (var role in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, role));
                }

                var newAccessToken = GetToken(authClaims, minutes: 15);
                var accessTokenString = tokenHandler.WriteToken(newAccessToken);

                return Ok(new
                {
                    accessToken = accessTokenString,
                    expiration = newAccessToken.ValidTo
                });
            }
            catch
            {
                return Unauthorized("Invalid or expired refresh token");
            }
        }

        // ✅ LOGOUT USER (clear cookie)
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("refreshToken");
            return Ok(new { message = "Logged out successfully" });
        }

        // ✅ GET CURRENT USER (based on cookie JWT)
        [Authorize]
        [HttpGet("Profile")]
        public IActionResult Profile()
        {
            var response = new BaseResponseModel();

            try
            {
                if (User?.Identity?.IsAuthenticated != true)
                    return Unauthorized("Not logged in");

                response.Status = true;
                response.StatusMessage = "User profile fetched successfully";
                response.Data = new 
                    {
                        name = User.Identity.Name,
                        email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
                        roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList(),
                        userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                    };

                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "An error occurred while fetching profile";
                return BadRequest(response);
            }
        }
        [Authorize]
        [HttpPut("Password")]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordDto model)
        {
            var response = new BaseResponseModel();

            try
            {
                // Get currently logged-in user from claims
                var userName = User.Identity?.Name;
                if (string.IsNullOrEmpty(userName))
                {
                    response.Status = false;
                    response.StatusMessage = "User not found";
                    return NotFound(response);
                }

                // Find user
                var user = await _userManager.FindByNameAsync(userName);
                if (user == null)
                {
                    response.Status = false;
                    response.StatusMessage = "User not found in database";
                    return NotFound(response);
                }
                // Check ConfirmPassword
                if (model.NewPassword != model.ConfirmPassword)
                {
                    response.Status = false;
                    response.StatusMessage = "New password and Confirm password do not match.";
                    return BadRequest(response);
                }
                // Check old password & update with new one
                var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
                if (!result.Succeeded)
                {
                    response.Status = false;
                    response.StatusMessage = string.Join("; ", result.Errors.Select(e => e.Description));
                    return BadRequest(response);
                }
                response.Status = true;
                response.StatusMessage = "Password changed successfully!";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.StatusMessage = "Error: " + ex.Message;
                return BadRequest(response);
            }
        }

        // 🔒 PRIVATE METHOD: Generate JWT with claims
        private JwtSecurityToken GetToken(List<Claim> authClaims, int minutes)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _config["JWT:ValidIssuer"],
                audience: _config["JWT:ValidAudience"],
                expires: DateTime.UtcNow.AddMinutes(minutes),  // ✅ use parameter
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return token;
        }


    }
}
