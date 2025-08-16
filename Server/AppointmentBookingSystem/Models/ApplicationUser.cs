using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace AppointmentBookingSystem.Models
{
//this is AspNetUsers table
    public class ApplicationUser: IdentityUser
    {
        [Required]
        public string Name {  get; set; }

        // Booked appointments as a customer
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        // Business/Freelancer profile (1-to-1)
        public ServiceOwner? ServiceOwner { get; set; }
    }
}
