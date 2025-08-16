using AppointmentBookingSystem.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentBookingSystem.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        [HttpGet("profile")] //GET /api/account/profile
        public IActionResult Profile()
        {
            var response = new BaseResponseModel();

            try
            {
                var username = User.Identity?.Name;

                if (string.IsNullOrEmpty(username))
                {
                    response.Status = false;
                    response.StatusMessage = "User not found";
                    return NotFound(response);
                }

                response.Status = true;
                response.StatusMessage = "User profile fetched successfully";
                response.Data = new { Username = username };

                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "An error occurred while fetching profile";
                return BadRequest(response);
            }
        }
    }
}
