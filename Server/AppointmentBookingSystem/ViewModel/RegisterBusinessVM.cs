using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace AppointmentBookingSystem.ViewModel
{
    public class RegisterBusinessVM 
    {
        public string Name { get; set; } = null!;
        [Required]
        public int CategoryID { get; set; }
        public string Description { get; set; } = null!;
        public bool IsSoloProvider { get; set; }

        public string CoverImageUrl { get; set; }
    
        public float Rating { get; set; }
        public string Location { get; set; }
    }
}
