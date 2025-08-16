using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppointmentBookingSystem.Models
{
    public class ServiceOwner
    {
        public int ID { get; set; }
        public string UserID { get; set; } // FK to ApplicationUser
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public int CategoryID { get; set; }
        public string Description { get; set; } = null!;
        public bool IsSoloProvider { get; set; }
        [ForeignKey("UserID")]
        public ApplicationUser User { get; set; } = null!;
        [ForeignKey("CategoryID")]
        public ServiceCategory Category { get; set; } = null!;
        public ICollection<Service> Services { get; set; } = new List<Service>();
    }

}
