//using AppointmentBookingSystem.Data;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.AspNetCore.Identity;
//using AppointmentBookingSystem.Models;
//using Microsoft.AspNetCore.Identity.UI.Services;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;
//using Microsoft.AspNetCore.Builder;
//using System.Text.Json.Serialization;
//using AppointmentBookingSystem.Profiles;
//using Humanizer;
////using AppointmentBookingSystem.Utility; // for SD static class

//var builder = WebApplication.CreateBuilder(args);

//// 📌 STEP 1: Add Services to Container
//builder.Services.AddDbContext<ApplicationDbContext>(
//    options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
//);

//// 📌 STEP 2: Configure Identity
//builder.Services
//    .AddIdentity<ApplicationUser, IdentityRole>(options =>
//    {
//        // Password requirements
//        options.Password.RequiredLength = 6;
//        options.Password.RequireNonAlphanumeric = false;
//        options.Password.RequireDigit = false;
//        options.Password.RequireUppercase = false;
//        options.Password.RequireLowercase = false;
//    })
//    .AddEntityFrameworkStores<ApplicationDbContext>()
//    .AddDefaultTokenProviders();

//builder.Services.AddScoped<IEmailSender, EmailSender>();

//// ✅ Fixed AutoMapper registration
//builder.Services.AddAutoMapper(typeof(Program).Assembly);

//// 📌 STEP 3: Configure JWT Authentication
//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//.AddJwtBearer(options =>
//{
//    options.SaveToken = true;
//    options.RequireHttpsMetadata = false;
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = true,
//        ValidateAudience = true,
//        ValidateLifetime = true,
//        ValidateIssuerSigningKey = true,
//        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
//        ValidAudience = builder.Configuration["JWT:ValidAudience"],
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
//    };

//    // ✅ Important: Allow JWTs from Cookies
//    options.Events = new JwtBearerEvents
//    {
//        OnMessageReceived = context =>
//        {
//            // Look for the token in the cookie instead of header
//            if (context.Request.Cookies.ContainsKey("jwt"))
//            {
//                context.Token = context.Request.Cookies["jwt"];
//            }
//            return Task.CompletedTask;
//        }
//    };
//});

//// 📌 STEP 4: Add CORS for Frontend
//builder.Services.AddCors(options =>
//{
//    options.AddDefaultPolicy(policy =>
//    { // This allows your React frontend(localhost: 3000) to call the API on(localhost: 5000).
//        policy.WithOrigins("http://localhost:5173") // React dev server
//              .AllowAnyMethod()
//              .AllowAnyHeader()
//              .AllowCredentials();
//    });
//});

//// ✅ Fixed: Single AddControllers call with JSON options
//builder.Services.AddControllers()
//    .AddJsonOptions(options =>
//    {
//        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
//        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
//    });

//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();


//var app = builder.Build();

//// 📌 STEP 6: Configure Pipeline
//if (app.Environment.IsDevelopment())
//{
//    app.UseDeveloperExceptionPage();
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
//app.UseHttpsRedirection();
//app.UseCors();
//app.UseAuthentication();
//app.UseAuthorization();
//app.MapControllers();

//// 📌 STEP 7: Seed Roles BEFORE running the app
//using (var scope = app.Services.CreateScope())
//{
//    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
//    await SeedRolesAsync(roleManager);
//}

//app.Run();

//// ✅ Helper method
//static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
//{
//    string[] roleNames = { SD.Role_Admin, SD.Role_User, SD.Role_ServiceProvider };

//    foreach (var roleName in roleNames)
//    {
//        if (!await roleManager.RoleExistsAsync(roleName))
//        {
//            await roleManager.CreateAsync(new IdentityRole(roleName));
//        }
//    }
//}
using AppointmentBookingSystem.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using AppointmentBookingSystem.Models;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Builder;
using System.Text.Json.Serialization;
using AppointmentBookingSystem.Profiles;
using Humanizer;
using System.Security.Claims;
//using AppointmentBookingSystem.Utility; // for SD static class

var builder = WebApplication.CreateBuilder(args);

// 📌 STEP 1: Add Services to Container
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// 📌 STEP 2: Configure Identity
builder.Services
    .AddIdentity<ApplicationUser, IdentityRole>(options =>
    {
        // Password requirements
        options.Password.RequiredLength = 6;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireDigit = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireLowercase = false;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<IEmailSender, EmailSender>();

// ✅ Fixed AutoMapper registration
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// 📌 STEP 3: Configure JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true, // 👈 enable to match issuer/audience properly
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        RoleClaimType = ClaimTypes.Role,
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
    };

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            // Header (Swagger, Postman, React fetch with Authorization)
            var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
            {
                context.Token = authHeader.Substring("Bearer ".Length).Trim();
            }
            // Cookie (React if using HttpOnly cookie auth)
            else if (context.Request.Cookies.ContainsKey("jwt"))
            {
                context.Token = context.Request.Cookies["jwt"];
            }

            return Task.CompletedTask;
        }
    };
});

// 📌 STEP 4: Add CORS for Frontend
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    { // This allows your React frontend(localhost: 3000) to call the API on(localhost: 5000).
        policy.WithOrigins("http://localhost:5173") // React dev server
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// ✅ Fixed: Single AddControllers call with JSON options
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Appointment Booking API",
        Version = "v1"
    });

    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Enter JWT like: Bearer {your token}"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});



var app = builder.Build();

// 📌 STEP 6: Configure Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// 📌 STEP 7: Seed Roles BEFORE running the app
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    await SeedRolesAsync(roleManager);
}

app.Run();

// ✅ Helper method
static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
{
    string[] roleNames = { SD.Role_Admin, SD.Role_User, SD.Role_ServiceProvider };

    foreach (var roleName in roleNames)
    {
        if (!await roleManager.RoleExistsAsync(roleName))
        {
            await roleManager.CreateAsync(new IdentityRole(roleName));
        }
    }
}