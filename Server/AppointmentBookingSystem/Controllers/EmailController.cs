using AppointmentBookingSystem.Services;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromQuery] string to, [FromQuery] string subject, [FromQuery] string body)
        {
            await _emailService.SendEmailAsync(to, subject, body);
            return Ok("Email sent successfully!");
        }
    }
}
