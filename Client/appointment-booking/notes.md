## Implement JWT Authentication, Identity, Role-based Access, and API in .NET Core
✅ Scaffold Identity and create ApplicationUser

✅ Add roles using a static SD class

✅ Configure Identity in Program.cs

✅ Create RegisterVM (view model) for registration input

✅ Create AuthController with Register & Login endpoints

✅ Generate JWT token on login

✅ Protect API routes with [Authorize] and roles

✅ Add Swagger for testing

✅ Test with Postman/Swagger

Detailed Steps & Code
Step 1: Scaffold Identity & Create ApplicationUser
csharp
Copy
Edit
public class ApplicationUser : IdentityUser
{
    [Required]
    public string Name { get; set; }
}
Don't include fields you don't need (you already removed address, city, etc.)

Run:

pgsql
Copy
Edit
dotnet ef migrations add UpdateApplicationUser
dotnet ef database update
Step 2: Add Static Role Class SD.cs
csharp
Copy
Edit
public class SD
{
    public const string Role_Admin = "Admin";
    public const string Role_ServiceProvider = "ServiceProvider";
    public const string Role_User = "User";
}
Step 3: Configure Identity in Program.cs
csharp
Copy
Edit
builder.Services
    .AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
Also add:

csharp
Copy
Edit
builder.Services.AddAuthentication().AddJwtBearer(...); // JWT setup (will explain in step 6)
Step 4: Create RegisterVM.cs
csharp
Copy
Edit
public class RegisterVM
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Role { get; set; }
}
Step 5: Create AuthController.cs
csharp
Copy
Edit
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AuthController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterVM model)
    {
        var user = new ApplicationUser
        {
            UserName = model.Email,
            Email = model.Email,
            Name = model.Name
        };

        var result = await _userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        if (!await _roleManager.RoleExistsAsync(model.Role))
            return BadRequest("Invalid role");

        await _userManager.AddToRoleAsync(user, model.Role);

        return Ok("User registered successfully");
    }
}
Step 6: Add JWT Authentication
Install NuGet package:

mathematica
Copy
Edit
Microsoft.AspNetCore.Authentication.JwtBearer
In appsettings.json:

json
Copy
Edit
"JWT": {
  "Key": "YourSuperSecretKeyHere!",
  "Issuer": "your-app",
  "Audience": "your-app"
}
In Program.cs:

csharp
Copy
Edit
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var key = Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]);
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});
Generate JWT token in your controller (Login endpoint):

csharp
Copy
Edit
var tokenHandler = new JwtSecurityTokenHandler();
var key = Encoding.UTF8.GetBytes(_config["JWT:Key"]);
var tokenDescriptor = new SecurityTokenDescriptor
{
    Subject = new ClaimsIdentity(new[]
    {
        new Claim(ClaimTypes.Name, user.Email),
        new Claim(ClaimTypes.Role, roles.FirstOrDefault())
    }),
    Expires = DateTime.UtcNow.AddHours(2),
    Issuer = _config["JWT:Issuer"],
    Audience = _config["JWT:Audience"],
    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
};
var token = tokenHandler.CreateToken(tokenDescriptor);
string tokenString = tokenHandler.WriteToken(token);
Return token in response:

csharp
Copy
Edit
return Ok(new { Token = tokenString });
Step 7: Use [Authorize] to Protect APIs
csharp
Copy
Edit
[Authorize]
[HttpGet("user/profile")]
public IActionResult Profile()
{
    var username = User.Identity.Name;
    return Ok($"Hello {username}");
}

[Authorize(Roles = SD.Role_Admin)]
[HttpGet("admin/dashboard")]
public IActionResult GetAdminDashboard()
{
    return Ok("Only Admins can see this");
}
Step 8: Add Swagger
In Program.cs:

csharp
Copy
Edit
builder.Services.AddSwaggerGen();
Then:

csharp
Copy
Edit
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
Test your register, login, and protected APIs from Swagger or Postman.

```
var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
```

[
  { "type": "name", "value": "nabiha" },
  { "type": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier", "value": "12345" }
]


| Claim Type       | Description                                                             | Value    |
| ---------------- | ----------------------------------------------------------------------- | -------- |
| `name`           | The user's name                                                         | `nabiha` |
| `nameidentifier` | The user's unique ID (usually the database ID or user ID from Identity) | `12345`  |
| ?.Value |	If the claim is found, return its value (in this case: "12345"). If not, return null (to prevent error).


- Claims are key-value pairs that store user info.
- ClaimTypes.NameIdentifier is used to get the user’s unique ID.
- The code is a safe and standard way to access the currently logged-in user’s ID in ASP.NET Core.

# ASP.NET Core & EF Core Query Explanation

## 1. `[FromQuery]`
In ASP.NET Core, `[FromQuery]` is an attribute you put on a controller action parameter.

It tells the framework: **"Get this parameter's value from the query string in the URL."**

**Example:**
```csharp
public IActionResult GetAppointments([FromQuery] int page, [FromQuery] string search)

GET /appointments?page=2&search=haircut
```
page will be 2

search will be "haircut"

Without [FromQuery], ASP.NET will still bind query string values to simple parameters in most cases, but [FromQuery] makes it explicit and is required for complex types.

2. var query = _context.Appointments...
This is Entity Framework Core code. Let’s break down what’s happening:
```csharp
var query = _context.Appointments
    .Include(a => a.Service)                      // Eager-load the related Service entity
    .ThenInclude(s => s.ServiceOwner)              // Also eager-load the ServiceOwner for that Service
    .Include(a => a.User)                          // Eager-load the related User entity
    .AsQueryable();                                // Make it queryable for further filtering
```
.AsQueryable()
- Keeps the result as an IQueryable instead of executing immediately.
- This allows further filtering (like .Where(...) or .OrderBy(...)) before EF Core sends the SQL to the database.

- [FromQuery] → Explicitly read values from the URL’s query string.
- EF Core chain → Start from Appointments, eagerly load related entities (Service, ServiceOwner, and User), keep query open for more filtering.

 Final Projection and Execution

```csharp
var appointments = query
    .Select(a => new
    {
        a.Id,
        a.AppointmentDateTime,
        a.Status,
        UserName = a.User.Name,
        UserEmail = a.User.Email,
        ServiceTitle = a.Service.Title,
        ServiceProviderName = a.Service.ServiceOwner.Name,
        ServicePrice = a.Service.Price
    })
    .OrderByDescending(a => a.AppointmentDateTime)
    .ToList();

```

What’s happening:
Select(...): Shapes the result into a new anonymous object with only the required fields.

Custom property names: Example → UserName = a.User.Name.

OrderByDescending(...): Sorts results by most recent appointment first.

ToList(): Executes the query and returns a list in memory.

Why use Select here:
Performance: Only retrieves the columns you need.

Shaping data: Allows renaming and combining fields.

Lightweight: Reduces memory usage compared to loading full entity objects.

✅ Full Flow:

Read query parameters → [FromQuery].
Build base query → .Include + .ThenInclude + .AsQueryable.
Apply conditional filters → .Where(...) only if needed.
Shape & sort results → .Select(...) + .OrderByDescending(...).
Execute query → .ToList().\




Why this is useful:
- Makes the search optional — if no serviceName is provided, all appointments are returned.
- If provided, you only get appointments whose service’s title matches (case sensitivity depends on the database collation).



## Resources 
- ER diagram : https://dbdiagram.io/d/689b5d1a1d75ee360a42cbbb 

<!-- Day of week -->