using AppointmentBookingSystem.Data;
using AppointmentBookingSystem.DTO;
using AppointmentBookingSystem.Models;
using AppointmentBookingSystem.ViewModel;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public UserController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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

                var appointmentDtos = _mapper.Map<List<AppointmentDto>>(appointments);

                response.Status = true;
                response.StatusMessage = "User appointments fetched successfully";
                response.Data = appointmentDtos;
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

                // Load the created appointment with related data for response
                var createdAppointment = _context.Appointments
                    .Include(a => a.Service)
                    .ThenInclude(s => s.ServiceOwner)
                    .FirstOrDefault(a => a.Id == appointment.Id);

                var appointmentDto = _mapper.Map<AppointmentDto>(createdAppointment);

                response.Status = true;
                response.StatusMessage = "Appointment created successfully";
                response.Data = appointmentDto;
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

                var appointmentDto = _mapper.Map<AppointmentDto>(appointment);

                response.Status = true;
                response.StatusMessage = "Appointment rescheduled successfully";
                response.Data = appointmentDto;
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
                var serviceCategoriesDto = _mapper.Map<List<CategoryDto>>(serviceCategories);

                response.Status = true;
                response.StatusMessage = "Services fetched successfully";
                response.Data = serviceCategoriesDto;
                return Ok(response);
            }
            catch(Exception ex)
            {
                response.Status = false;
                response.StatusMessage = "Error fetching services";
                return BadRequest(response);
            }
        }

        // GET: api/user/serviceOwnersOfCategory/{id} - Get all available servicesProviders List 
        [HttpGet("serviceOwnersOfCategory/{id}")]
        public IActionResult GetServiceOwnersOfCategory(int id)
        {
            var response = new BaseResponseModel();
            try
            {
                var serviceCategory = _context.ServiceCategories
                    .Include(s => s.ServiceOwners)
                    .FirstOrDefault(s => s.ID == id);

                if(serviceCategory == null)
                {
                    response.Status = false;
                    response.StatusMessage = "Service Category not found ";
                    return NotFound(response);
                }

                var categoryDto = _mapper.Map<List<ServiceOwnerDto>>(serviceCategory.ServiceOwners);

                // Check if ServiceOwners collection is empty (not null)
                if ( !serviceCategory.ServiceOwners.Any())
                {
                    response.Status = true; // Changed to true since category exists
                    response.StatusMessage = "Service Category found but no Service Owners in this category";
                }
                else
                {
                    response.Status = true;
                    response.StatusMessage = "Service Category and Service Owners fetched successfully";
                }

                response.Data = categoryDto;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.StatusMessage = $"Error fetching ServiceProviders: {ex.Message}";
                return BadRequest(response);
            }
        }

        // GET: api/user/servicesOfOwner/{id} - Get all available services of specific ServicePriovider
        [HttpGet("servicesOfOwner/{id}")]
        public IActionResult GetServicesOfOwner(int id)
        {
            var response = new BaseResponseModel();
            try
            {
                var serviceOwner = _context.ServiceOwners
                    .Include(s=> s.Services)
                    .Include(s => s.Category)
                    .FirstOrDefault(s => s.ID == id);

                if(serviceOwner == null)
                {
                    response.Status = false;
                    response.StatusMessage = "ServiceProvider not found ";
                    return NotFound(response);
                }
                var services = _mapper.Map<List<ServiceDto>>(serviceOwner.Services);

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
                                .ToList();

                var serviceDtos = _mapper.Map<List<ServiceDto>>(services);

                response.Status = true;
                response.StatusMessage = "Services fetched successfully";
                response.Data = serviceDtos;
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
                var serviceOwners = _context.ServiceOwners
                .Include(s => s.Category)
                .ToList();

                var serviceOwnerDtos = _mapper.Map<List<ServiceOwnerDto>>(serviceOwners);

                response.Status = true;
                response.StatusMessage = "Services fetched successfully";
                response.Data = serviceOwnerDtos;
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

// I removed include cateogory noew check servies fget krny pe kiya chezein arhi hain   
//  GetServiceOwners it shouldnt have category whole, bcs category has option of serviceOwner list which is creating mess not needed here 