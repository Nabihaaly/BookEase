using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppointmentBookingSystem.Models
{
    public class Service
    {
        [Key]
        public int ID { get; set; }
        public int ServiceOwnerID { get; set; } //FK to ServiceOwner
        [Required]
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int DurationMinutes { get; set; } = 10;
        public decimal Price { get; set; } = 5;
        public int MaxAppointmentsPerDay { get; set; } = 5;
        [Required]
        public string DayOfWeek { get; set; } = null!;
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        [ForeignKey("ServiceOwnerID")]
        public ServiceOwner ServiceOwner { get; set; } = null!;
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }


}
