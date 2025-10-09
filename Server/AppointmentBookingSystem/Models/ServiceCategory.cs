using System.ComponentModel.DataAnnotations;

namespace AppointmentBookingSystem.Models
{
    public class ServiceCategory
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public string Description { get; set; }
        public string IconKey { get; set; }

        public ICollection<ServiceOwner> ServiceOwners { get; set; } = new List<ServiceOwner>();

    }
}
