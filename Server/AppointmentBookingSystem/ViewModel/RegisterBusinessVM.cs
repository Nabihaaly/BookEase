using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace AppointmentBookingSystem.ViewModel
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterBusinessVM : ControllerBase
    {
        public string Name { get; set; } = null!;
        [Required]
        public int CategoryID { get; set; }
        public string Description { get; set; } = null!;
        public bool IsSoloProvider { get; set; }
    }
}
