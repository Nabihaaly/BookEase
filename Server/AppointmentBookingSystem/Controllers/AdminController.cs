using AppointmentBookingSystem.Data;
using AppointmentBookingSystem.Models;
using AppointmentBookingSystem.ViewModel;
using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using System;

namespace AppointmentBookingSystem.Controllers
{
    [Authorize(Roles = SD.Role_Admin)]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager; //Handles users (ApplicationUser)

        private readonly ApplicationDbContext _context;

        public AdminController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        // ===== APPOINTMENTS MANAGEMENT =====

        // GET: api/admin/appointments - Get all appointments with filtering
        [HttpGet("appointments")]
        public IActionResult GetAllAppoinments(
            [FromQuery] DateTime? fromDate = null,
            [FromQuery] DateTime? toDate = null,
            [FromQuery] string? status = null,
            [FromQuery] int? serviceId = null,
            [FromQuery] string? serviceName = null,
            [FromQuery] string? serviceOwnerName = null
            )
        {
           BaseResponseModel response = new BaseResponseModel();
            try
            {
                var query = _context.Appointments
                    .Include(a => a.Service)
                    .ThenInclude(s => s.ServiceOwner)
                    .Include(a => a.User) // 1. UserID is a primitive property (string or Guid), not a navigation property. 2. Include() only works with navigation properties(e.g., a.User). (Assuming Appointment has a navigation property User to ApplicationUser) 
                    .AsQueryable();
                

                // Apply filters
                if (fromDate.HasValue)
                {
                    query = query.Where(a => a.AppointmentDateTime >= fromDate.Value);
                }
                if ( toDate.HasValue)
                {
                    query = query.Where(a => a.AppointmentDateTime <= toDate.Value);
                }
                if (!string.IsNullOrEmpty(status))
                {
                    query = query.Where(a => a.Status.ToLower() == status.ToLower());
                }                
                if ( serviceId.HasValue)
                {
                    query = query.Where(a => a.ServiceID == serviceId.Value);
                }               
                if (!string.IsNullOrEmpty(serviceName))
                {
                    query = query.Where(a => a.Service.Title.Contains(serviceName));
                }
                if (!string.IsNullOrEmpty(serviceOwnerName))
                {
                    query = query.Where(a => a.Service.ServiceOwner.Name.Contains(serviceOwnerName));
                }

                var appointments = query
                    .Select(a => new
                    {
                        a.Id,
                        a.AppointmentDateTime,
                        a.Status,
                        UserName = a.User != null ? a.User.Name : null,
                        UserEmail = a.User != null ? a.User.Email : null,
                        ServiceTitle = a.Service.Title,
                        ServiceOwnerName = a.Service.ServiceOwner.Name,
                        ServicePrice = a.Service.Price
                    })
                    .OrderByDescending( a => a.AppointmentDateTime)
                    .ToList();

                response.Status = true;
                response.StatusMessage = "Appointments fetched successfully";
                response.Data = appointments;
                return Ok(response);
            }
            catch (Exception ex)
            {
                //TODO: dp logging exceptions (if smthn went wrong ask user time wgera masla)
                response.Status = false;
                response.StatusMessage = "Error getting appointments: ";
                response.StatusMessage = ex.ToString(); 

                return BadRequest(response);
            }
        }

        // DELETE: api/admin/appointment/5
        [HttpDelete("appointment/{id}")]
        public IActionResult DeleteAppointment(int? id)
        {
            BaseResponseModel response = new BaseResponseModel();
            try
            {
                Appointment? appointment = _context.Appointments.FirstOrDefault(a=> a.Id == id);
                if (appointment == null)
                {
                    response.Status = false;
                    response.StatusMessage = "id not valid";
                    return BadRequest(response);
                }
                _context.Appointments.Remove(appointment);
                _context.SaveChanges();

                response.Status = true;
                response.StatusMessage = "Appointment Deleted Successully";

                return Ok(response);
            }

            catch (Exception ex)
            {
                response.Status = false;
                response.StatusMessage = "smthn went wrong ";

                return BadRequest(response);

                throw;
            }
        }

        // ===== USERS MANAGEMENT =====

        // GET: api/admin/users
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            BaseResponseModel response = new BaseResponseModel();
            try
            {
                var users = new List<object>();
                foreach (var user in _context.ApplicationUsers
                             .Include(u => u.Appointments) // 👈 load appointments
                             .Include(u => u.ServiceOwner) // 👈 load service owner if needed
                             .ToList())
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    // Only keep "User" role
                    if (roles.Contains("User"))
                    {
                        users.Add(new
                        {
                            user.Id,
                            user.Name,
                            user.Email,
                            user.PhoneNumber,
                            user.EmailConfirmed,
                            AppointmentsCount = user.Appointments.Count(),
                            HasServiceOwnerProfile = user.ServiceOwner != null
                        });
                    }

                }
                response.Status = true;
                response.StatusMessage = "Fetched users successfully";
                response.Data = users;
                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Error getting users";
                return BadRequest(response);
            }
        }

        // DELETE: api/admin/user/{id}
        [HttpDelete("user/{id}")]
        public IActionResult DeletePostUser(string id)
        {
            BaseResponseModel response = new BaseResponseModel();
            try
            {
                var user = _context.ApplicationUsers
                    .Include(u => u.Appointments)
                    .Include(u => u.ServiceOwner)
                    .ThenInclude(so => so.Services)
                    .FirstOrDefault(u => u.Id == id);

                if (user == null)
                {
                    response.Status = false;
                    response.StatusMessage = "User not found";
                    return NotFound(response);
                }

                // Remove related data first (cascade delete might not be configured)
                if (user.ServiceOwner != null)
                {
                    // Remove services and their appointments
                    foreach (var service in user.ServiceOwner.Services)
                    {
                        _context.Appointments.RemoveRange(service.Appointments);
                    }
                    _context.Services.RemoveRange(user.ServiceOwner.Services);
                    _context.ServiceOwners.Remove(user.ServiceOwner);
                }

                // Remove user's appointments
                _context.ApplicationUsers.Remove(user);
                _context.SaveChanges();

                response.Status = true;
                response.StatusMessage = "User deleted successfully";
                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Something went wrong while deleting user";
                return BadRequest(response);
            }
        }
        
        
        // ===== SERVICE PROVIDERS/OWNERS MANAGEMENT =====

        // GET: api/admin/serviceOwners - Get all service providers
        [HttpGet("serviceOwners")]
        public IActionResult GetAllServiceOwners()
        {
            var response = new BaseResponseModel();
            try
            {
                // First, load all the data with includes
                var serviceOwnersWithData = _context.ServiceOwners
                    .Include(so => so.Services)
                        .ThenInclude(s=> s.Appointments)
                    .Include(so => so.User)
                    .Include(so => so.Category)
                    .ToList(); // Materialize the query first
                
                // Then project to anonymous type
                var result = serviceOwnersWithData.Select(so => new
                {
                        so.ID,
                        so.Name, so.Description,
                        so.IsSoloProvider,
                        UserEmail = so.User.Email,
                        CategoryName = so.Category.Name,
                        ServiceCount = so.Services.Count,
                        //TotalAppointments = so.Services.Sum(s => s.Appointments.Count())
                }).ToList();

                response.Status = true;
                response.StatusMessage = "Service providers fetched successfully";
                response.Data = result;
                return Ok(response);

            }
            catch (Exception ex)
            {
                response.Status = false;
                response.StatusMessage = "Error fetching service providers. Error: "+ex.ToString;
                return BadRequest(response);

            }
        } // GET: api/admin/services - Get all service providers
        [HttpGet("services")]
        public IActionResult GetAllServices()
        {
            var response = new BaseResponseModel();
            try
            {
                // First, load all the data with includes
                var servicesName = _context.Services
                    .Select(s => new
                    {
                        s.Title
                    })
                    .ToList();
                
                response.Status = true;
                response.StatusMessage = "Services fetched successfully";
                response.Data = servicesName;
                return Ok(response);

            }
            catch (Exception ex)
            {
                response.Status = false;
                response.StatusMessage = "Error fetching services.";
                return BadRequest(response);

            }
        }
        
        // DELETE: api/admin/serviceOwner/{id} - Delete service provider
        [HttpDelete("serviceOwner/{id}")]
        public IActionResult DeleteserviceOwner(int id)
        {
            var response = new BaseResponseModel();
            try
            {
                var serviceOwner = _context.ServiceOwners
                    .Include(so => so.Services)
                    .ThenInclude(s => s.Appointments)
                    .FirstOrDefault(so => so.ID == id);

                if (serviceOwner == null)
                {
                    response.Status = false;
                    response.StatusMessage = "Service owner not found";
                    return NotFound(response);
                }

                // Remove appointments for all services
                foreach(var service in serviceOwner.Services)
                {
                    _context.Appointments.RemoveRange(service.Appointments);
                }
                // RemoveRange() is an Entity Framework method that efficiently deletes multiple records at once

                // Remove services of this owner 
                _context.Services.RemoveRange(serviceOwner.Services);

                // Remove service provider
                _context.ServiceOwners.Remove(serviceOwner);
                _context.SaveChanges();

                response.Status = true;
                response.StatusMessage = "Service providers deleted  successfully";
                return Ok(response);

            }
            catch (Exception ex)
            {
                response.Status = false;
                response.StatusMessage = "Error deleting service providers";
                return BadRequest(response);

            }
        }

        // ===== ANALYTICS & REPORTS =====

        // GET: api/admin/dashboard - Get dashboard statistics
        [HttpGet("dashboard")]
        public IActionResult GetDashboardStats()
        {
            var response = new BaseResponseModel();
            try
            {
                var stats = new
                {
                    TotalUsers = _context.ApplicationUsers.Count(),
                    TotalServiceCategories = _context.ServiceCategories.Count(),
                    TotalServiceOwners = _context.ServiceOwners.Count(),
                    TotalServices = _context.Services.Count(),
                    TotalAppointments = _context.Appointments.Count(),
                    PendingAppointments = _context.Appointments.Count(a => a.Status == "Pending"),
                    ConfirmedAppointments = _context.Appointments.Count(a => a.Status == "Confirmed"),
                    CompletedAppointments = _context.Appointments.Count(a => a.Status == "Completed"),
                    CancelledAppointments = _context.Appointments.Count(a => a.Status == "Cancelled"),
                    TodaysAppointments = _context.Appointments.Count(a => a.AppointmentDateTime.Date == DateTime.Today),
                    RecentAppointments = _context.Appointments
                                        .Include(a => a.Service)
                                        .Include(a => a.User)
                                        .OrderBy(a => a.AppointmentDateTime)
                                        .Take(5)
                                        .Select(a => new
                                        {
                                            a.Id,
                                            a.AppointmentDateTime,
                                            a.Status,
                                            ServiceTitle = a.Service.Title,
                                            ServiceOwner = a.Service.ServiceOwner.Name,
                                            UserName = a.User.Name,
                                            Email= a.User.Email
                                        })
                                        .ToList()
            };

                response.Status = true;
                response.StatusMessage = "Dashboard stats fetched successfully";
                response.Data = stats;
                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Error fetching dashboard stats";
                return BadRequest(response);
            }
        }
     }
}
