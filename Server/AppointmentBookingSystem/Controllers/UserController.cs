using AppointmentBookingSystem.Data;
using AppointmentBookingSystem.Models;
using AppointmentBookingSystem.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

// 1. USER CONTROLLER - For User Role
// All CRUD for appointments + GET services

namespace AppointmentBookingSystem.Controllers
{
    [Authorize(Roles = SD.Role_User)]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/user/appointments - Get user's own appointments only
        [HttpGet("appointments")]
        public IActionResult GetMyAppointments()
        {
            var response = new BaseResponseModel();
            try
            {
                // Get current user ID from claims
                var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if(string.IsNullOrEmpty(currentUserId))
                {
                    response.Status = false;
                    response.StatusMessage = "User not found";
                    return BadRequest(response);
                }
                var appointments = _context.Appointments
                    .Include(a => a.Service)
                    .ThenInclude(s => s.ServiceOwner)
                    .Where(a=> a.UserID == currentUserId)
                    .ToList();

                response.Status = true;
                response.StatusMessage = "User appointments fetched successfully";
                response.Data = appointments;
                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Error fetching appointments";
                return BadRequest(response);
            }
        }

        // POST: api/user/appointment - Create new appointment
        [HttpPost("appointment")]
        public IActionResult CreateAppointment([FromBody] CreateAppointmentViewModel model)
        {
            var response = new BaseResponseModel();
            try
            {
                var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (!ModelState.IsValid || string.IsNullOrEmpty(currentUserId))
                {
                    response.Status = false;
                    response.StatusMessage = "Invalid appointment data";
                    return BadRequest(response);
                }

                /// Check if service exists
                var service = _context.Services.Find(model.ServiceID);
                if(service == null)
                {
                    response.Status = false;
                    response.StatusMessage = "Service not found";
                    return NotFound(response);
                }
                // 1. Daily limit check
                if (service.MaxAppointmentsPerDay <= service.Appointments
                    .Where(a => a.AppointmentDateTime.Date == model.AppointmentDateTime.Date)
                    .Count())
                {
                    response.Status = false;
                    response.StatusMessage = "Appointments are booked for this date";
                    return BadRequest(response);
                }
                // 2. Exact time slot check
                if (service.Appointments.Any(a =>
                    a.AppointmentDateTime.Date == model.AppointmentDateTime.Date &&
                    a.AppointmentDateTime.TimeOfDay == model.AppointmentDateTime.TimeOfDay))
                {
                    response.Status = false;
                    response.StatusMessage = "This slot is already booked";
                    response.Data = model.AppointmentDateTime;
                    return BadRequest(response);
                }
                var appointment = new Appointment
                {
                    UserID = currentUserId,
                    ServiceID = model.ServiceID,
                    AppointmentDateTime = model.AppointmentDateTime
                };

                _context.Appointments.Add(appointment);
                _context.SaveChanges();

                response.Status = true;
                response.StatusMessage = "Appointment created successfully";
                response.Data = appointment;
                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Error creating appointment";
                return BadRequest(response);
            }
        }

        // PUT: api/user/appointment/{id} - Update user's own appointment
        [HttpPut("appointment/{id}")]
        public IActionResult UpdateAppointment(int id, [FromBody] UpdateAppointmentViewModel model)
        {
            var response = new BaseResponseModel();
            try
            {
                // Debug: Print all claims
                var claims = User.Claims.ToList();
                foreach (var claim in claims)
                {
                    Console.WriteLine($"Claim Type: {claim.Type}, Value: {claim.Value}");
                }
                var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if ( string.IsNullOrEmpty(currentUserId))
                {
                    response.Status = false;
                    response.StatusMessage = "User not found";
                    return BadRequest(response);
                }

                var appointment = _context.Appointments.FirstOrDefault(a => a.Id == id && a.UserID == currentUserId);
                
                if ( appointment == null || !ModelState.IsValid)
                {
                    response.Status = false;
                    response.StatusMessage = "Appointment not found";
                    return NotFound(response);
                }
                // Only allow updating if status is Pending
                if (appointment.Status != "Pending")
                {
                    response.Status = false;
                    response.StatusMessage = "Cannot modify confirmed or cancelled appointments";
                    return BadRequest(response);
                }
                appointment.AppointmentDateTime = model.AppointmentDateTime;
                _context.Appointments.Update(appointment);
                _context.SaveChanges();

                response.Status = true;
                response.StatusMessage = "Appointment rescheduled successfully";
                response.Data = appointment;
                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Error updating appointment";
                return BadRequest(response);
            }
        }

        // ✅ DELETE: api/user/appointment/{id}
        [HttpDelete("appointment/{id}")]
        public IActionResult Delete(int id)
        {
            var response = new BaseResponseModel();
            try
            {
                var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId))
                {
                    response.Status = false;
                    response.StatusMessage = "User not found";
                    return BadRequest(response);
                }
                var appointment = _context.Appointments.FirstOrDefault(a => a.Id == id && a.UserID == currentUserId);
                if (appointment == null)
                {
                    response.Status = false;
                    response.StatusMessage = "Appointment not found";
                    return NotFound(response);
                }

                _context.Appointments.Remove(appointment);
                _context.SaveChanges();

                response.Status = true;
                response.StatusMessage = "Appointment cancelled successfully";
                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Error deleting appointment";
                return BadRequest(response);
            }
        }
        
        // GET: api/user/serviceCategories - Get all available Categories of services
        [HttpGet("serviceCategories")]
        public IActionResult GetServiceCategories()
        {
            var response = new BaseResponseModel();
            try
            {
                var serviceCategories = _context.ServiceCategories.ToList();

                response.Status = true;
                response.StatusMessage = "Services fetched successfully";
                response.Data = serviceCategories;
                return Ok(response);
            }
            catch(Exception ex)
            {
                response.Status = false;
                response.StatusMessage = "Error fetching services";
                return BadRequest(response);
            }
        }
            // GET: api/user/serviceCategory/{id} - Get all available servicesProviders List 
        [HttpGet("serviceCategory/{id}")]
        public IActionResult GetServiceCategory(int id)
        {
            var response = new BaseResponseModel();
            try
            {
                var serviceCategory = _context.ServiceCategories
                    .FirstOrDefault(s => s.ID == id);
                if(serviceCategory == null)
                {
                    response.Status = false;
                    response.StatusMessage = "Service Category not found ";
                    return NotFound(response);
                }
                var serviceOwners = serviceCategory.ServiceOwners.ToList();

                response.Status = true;
                response.StatusMessage = "ServiceProviders fetched successfully";
                response.Data = serviceOwners;
                return Ok(response);
            }
            catch(Exception ex)
            {
                response.Status = false;
                response.StatusMessage = "Error fetching ServiceProviders";
                return BadRequest(response);
            }
        }
        // GET: api/user/serviceOwner/{id} - Get all available services of specific ServicePriovider
        [HttpGet("serviceOwner/{id}")]
        public IActionResult GetServices(int id)
        {
            var response = new BaseResponseModel();
            try
            {
                var serviceOwner = _context.ServiceOwners
                    .FirstOrDefault(s => s.ID == id);
                if(serviceOwner == null)
                {
                    response.Status = false;
                    response.StatusMessage = "ServiceProvider not found ";
                    return NotFound(response);
                }
                var services = serviceOwner.Services.ToList();

                response.Status = true;
                response.StatusMessage = "Services fetched successfully";
                response.Data = services;
                return Ok(response);
            }
            catch(Exception ex)
            {
                response.Status = false;
                response.StatusMessage = "Error fetching services";
                return BadRequest(response);
            }
        }

        // --------------FOR FUTURE FEATUERES 

        // GET: api/user/services - Get all available services
        [HttpGet("services")]
        public IActionResult GetServices()
        {
            var response = new BaseResponseModel();
            try
            {
                var services = _context.Services
                                .Include(s => s.ServiceOwner)
                                .ThenInclude(so => so.Category)
                                .ToList();
                response.Status = true;
                response.StatusMessage = "Services fetched successfully";
                response.Data = services;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.StatusMessage = "Error fetching services";
                return BadRequest(response);
            }
        }
        // GET: api/user/serviceOwners - Get all available services
        [HttpGet("serviceOwners")]
        public IActionResult GetServiceOwners()
        {
            var response = new BaseResponseModel();
            try
            {
                var serviceOwners = _context.ServiceOwners.ToList();

                response.Status = true;
                response.StatusMessage = "Services fetched successfully";
                response.Data = serviceOwners;
                return Ok(response);
            }
            catch(Exception ex)
            {
                response.Status = false;
                response.StatusMessage = "Error fetching services";
                return BadRequest(response);
            }
        }
    }
}
