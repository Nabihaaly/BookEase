using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppointmentBookingSystem.Models
{
    public class Appointment
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserID { get; set; }

        [Required]
        public int ServiceID { get; set; }

        [Required]
        public DateTime AppointmentDateTime { get; set; }
        [Required]
        [MaxLength(20)]
        public String Status { get; set; } = "Pending"; // Default status

        [ForeignKey("UserID")]
        public ApplicationUser User { get; set; }
        [ForeignKey("ServiceID")]
        public Service? Service { get; set; }


    }
}
