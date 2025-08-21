// 2. SERVICE PROVIDER CONTROLLER - For ServiceProvider Role
// CRUD for own services + manage appointments for own services

using AppointmentBookingSystem.Data;
using AppointmentBookingSystem.DTO;
using AppointmentBookingSystem.Models;
using AppointmentBookingSystem.ViewModel;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Azure;
using Humanizer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Diagnostics;
using System.Security.Claims;


namespace AppointmentBookingSystem.Controllers
{
    [Authorize(Roles = SD.Role_ServiceProvider)]
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceOwnerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ServiceOwnerController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        //Helper method to get current user's ServiceOwner ID
        private int? GetCurrentServiceOwnerId()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //    NameIdentifier: The user's unique ID (usually the database ID or user ID from Identity) | `12345`  |
            //| ?.Value | If the claim is found, return its value(in this case: "12345"). If not, return null(to prevent error).

            if (string.IsNullOrEmpty(currentUserId))
                    return null;

                var serviceOwner = _context.ServiceOwners.FirstOrDefault(so => so.UserID == currentUserId);
                return serviceOwner?.ID;
            }

            

        //  ===== REGISTER YOUR BUSINESS  =====

        // GET: api/serviceOwner/register-business
        [HttpPost("register-business")]
        public IActionResult RegisterBusiness(RegisterBusinessVM model)
        {
            var response = new BaseResponseModel();
            try
            {
                if (!ModelState.IsValid)
                {
                    response.Status = false;
                    response.StatusMessage = "Invalid business details";
                    return BadRequest(response);
                }

                var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId))
                {
                    response.Status = false;
                    response.StatusMessage = "User not found";
                    return Unauthorized(response);
                }

                var serviceOwnerId = GetCurrentServiceOwnerId();
                if (serviceOwnerId != null)
                {
                    response.Status = false;
                    response.StatusMessage = "Business Already Exist";
                    return BadRequest(response);
                }
                var serviceOwner = new ServiceOwner
                {
                    UserID = currentUserId,
                    Name = model.Name,
                    CategoryID = model.CategoryID,
                    Description = model.Description,
                    IsSoloProvider = model.IsSoloProvider
                };

                _context.ServiceOwners.Add(serviceOwner);
                _context.SaveChanges();

                response.Status = true;
                response.StatusMessage = "Registered Succesfully";
                response.Data = serviceOwner;

                return Ok(response);

            }
            catch (Exception ex) {
                response.Status = false;
                response.StatusMessage = "Error registering bussiness "+ ex.ToString;
                return BadRequest(response);
            }
        }

        // ===== APPOINTMENTS MANAGEMENT =====

        // GET: api/serviceOwner/appointments - Get serviceOwner's own appointments only
        [HttpGet("appointments")]
        public IActionResult GetMyAppointments(
                [FromQuery] int? serviceId = null,
                [FromQuery] string? serviceName = null,
                [FromQuery] DateTime? fromDate = null,
                [FromQuery] DateTime? toDate = null,
                [FromQuery] string? status = null
            )
        {
            var response = new BaseResponseModel();
            try
            {
                var serviceOwnerId = GetCurrentServiceOwnerId();
                if (serviceOwnerId == null)
                {
                    response.Status = false;
                    response.StatusMessage = "Service owner profile not found";
                    return BadRequest(response);
                }
                // Get appointments for services owned by current service provider
                var query = _context.Appointments               
                    .Include(a => a.Service)
                    .Include(a => a.User)
                    .Where(a => a.Service.ServiceOwnerID == serviceOwnerId)
                    .AsQueryable();

                if (!string.IsNullOrEmpty(serviceName))
                {
                    query = query.Where(a => a.Service.Title == serviceName);
                }
                if (serviceId.HasValue)
                {
                    query = query.Where(a => a.Service.ID == serviceId.Value);
                }

                if (!string.IsNullOrEmpty(status))
                {
                    query = query.Where(a => a.Status.ToLower() == status.ToLower());
                }
                //var appointments = query.Select(a => new
                //{
                //    a.Id,
                //    a.AppointmentDateTime,
                //    a.Status,
                //    UserName = a.User.Name,
                //    UserEmail = a.User.Email,
                //    SericeTitle = a.Service.Title,
                //    ServicePrice = a.Service.Price

                //})
                //.OrderByDescending(a => a.AppointmentDateTime)
                //.ToList();

                //var appointmentDtos = _mapper.Map<List<ServiceOwnerAppointmentDto>>(query);
                var appointmentDtos = query
                    .ProjectTo<ServiceOwnerAppointmentDto>(_mapper.ConfigurationProvider)
                    .ToList();

                response.Status = true;
                response.StatusMessage = " appointments fetched successfully";
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
        
        // PUT: api/serviceProvider/appointment/{id} - Update appointment status
        [HttpPut("appointment/{id}")]
        public IActionResult UpdateAppointment(int id, [FromBody] UpdateAppointmentStatusVM model)
        {
            var response = new BaseResponseModel();
            try
            {
                var serviceOwnerId = GetCurrentServiceOwnerId();
                if (serviceOwnerId == null)
                {
                    response.Status = false;
                    response.StatusMessage = "Service owner profile not found";
                    return BadRequest(response);
                }
                // Ensure appointment belongs to service owned by current provider
                var appointment = _context.Appointments
                    .Include(a => a.Service)
                    .FirstOrDefault(a => a.Id == id && a.Service.ServiceOwnerID == serviceOwnerId);

                if (appointment == null || !ModelState.IsValid)
                {
                    response.Status = false;
                    response.StatusMessage = "Appointment not found";
                    return NotFound(response);
                }
                // Validate status values (Pending, Confirmed, Cancelled, Completed)
                var validStatuses = new[] { "Pending", "Confirmed", "Cancelled", "Completed" };
                if (!validStatuses.Contains(model.Status))
                {
                    response.Status = false;
                    response.StatusMessage = "Invalid status. Valid statuses: Pending, Confirmed, Cancelled, Completed";
                    return BadRequest(response);
                }
                appointment.Status = model.Status;
                _context.Appointments.Update(appointment);
                _context.SaveChanges();

                response.Status = true;
                response.StatusMessage = "Appointment status updated successfully";
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
                var serviceOwnerId = GetCurrentServiceOwnerId();
                if (serviceOwnerId == null)
                {
                    response.Status = false;
                    response.StatusMessage = "Service owner profile not found";
                    return BadRequest(response);
                }
                // Ensure appointment belongs to service owned by current provider
                var appointment = _context.Appointments
                    .Include(a => a.Service)
                    .FirstOrDefault(a => a.Id == id && a.Service.ServiceOwnerID == serviceOwnerId);

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

        //===== SERVICE OWNER ADD EDIT =====


        //===== SERVICES CRUD =====

        // GET: api/serviceOwner/services
        // per service kitni appointments booked hain agr ye bh dekh skein?
        [HttpGet("services")]
        public IActionResult GetServices()
        {
            BaseResponseModel response = new BaseResponseModel();
            try
            {
                var serviceOwnerId = GetCurrentServiceOwnerId();
                if (serviceOwnerId== null)
                {
                    response.Status = false;
                    response.StatusMessage = "User not found";
                    return BadRequest(response);
                }
                var serviceOwner = _context.ServiceOwners
                    .Include(s => s.Services)
                    .FirstOrDefault(s => s.ID == serviceOwnerId);

                var servicesDtos = _mapper.Map<List<ServiceOwnerServiceDto>>(serviceOwner.Services);

                response.Status = true;
                response.StatusMessage = "User services fetched successfully";
                response.Data = servicesDtos;
                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Error fetching services";
                return BadRequest(response);
            }
        }
        // POST : api/serviceOwner/service
        [HttpPost("service")]
        public IActionResult CreateServices([FromBody] CreateServiceVM model)
        {
            BaseResponseModel response = new BaseResponseModel();
            try
            {
                var serviceOwnerId = GetCurrentServiceOwnerId();
                if (serviceOwnerId == null)
                {
                    response.Status = false;
                    response.StatusMessage = "Service owner profile not found";
                    return BadRequest(response);
                }
                var service = new Service
                {
                    ServiceOwnerID = serviceOwnerId.Value,
                    Title = model.Title,
                    Description = model.Description,
                    DurationMinutes = model.DurationMinutes,
                    Price = model.Price,
                    MaxAppointmentsPerDay = model.MaxAppointmentsPerDay,
                    DayOfWeek = model.DayOfWeek,
                    StartTime = model.StartTime,
                    EndTime = model.EndTime
                };
                _context.Services.Add(service);
                _context.SaveChanges();

                response.Status = true;
                response.StatusMessage = " service created successfully";
                response.Data = service;
                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Error creating service";
                return BadRequest(response);
            }


        }
        // PUT : api/serviceOwner/service{id}
        [HttpPut("service/{id}")]
        public IActionResult UpdateService(int id, [FromBody] UpdateServiceVM model)
        {
            BaseResponseModel response = new BaseResponseModel();
            try
            {
                // get current user ID from claims 
                var serviceOwnerId = GetCurrentServiceOwnerId();

                // Ensure service belongs to current service owner
                var service = _context.Services.FirstOrDefault(s => s.ID == id && s.ServiceOwnerID  == serviceOwnerId);
                if(service == null )
                {
                    response.Status = false; 
                    response.StatusMessage = "Service not found or access denied";
                    return NotFound(response);
                }
                // Update service properties
                service.Title = model.Title;
                service.Description = model.Description;
                service.DurationMinutes = model.DurationMinutes;
                service.Price = model.Price;
                service.MaxAppointmentsPerDay = model.MaxAppointmentsPerDay;
                service.DayOfWeek = model.DayOfWeek;
                service.StartTime = model.StartTime;
                service.EndTime = model.EndTime;

                _context.Services.Update(service);
                _context.SaveChanges();

                response.Status = true;
                response.StatusMessage = " service updated successfully";
                response.Data = service;
                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Error creating service";
                return BadRequest(response);
            }
        }
        //DELETE : api/serviceOwner/service{id}
        [HttpDelete("service/{id}")]
        public IActionResult DeleteService(int id)
        {
            BaseResponseModel response = new BaseResponseModel();
            try
            {
                // get current user ID from claims 
                var serviceOwnerId = GetCurrentServiceOwnerId();

                // Ensure service belongs to current service owner
                var service = _context.Services.FirstOrDefault(s => s.ID == id && s.ServiceOwnerID == serviceOwnerId);
                if (service == null)
                {
                    response.Status = false;
                    response.StatusMessage = "service not found";
                    return NotFound(response);
                }

                _context.Services.Remove(service);
                _context.SaveChanges();

                response.Status = true;
                response.StatusMessage = " service deleted successfully";
                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Error deleting service";
                return BadRequest(response);
            }
            }
        }
}
