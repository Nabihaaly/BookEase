using AppointmentBookingSystem.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppointmentBookingSystem.ViewModel
{
    public class UpdateServiceOwnerVM
    {
        [Required]
        public string Name { get; set; } = null!;
        
        public int CategoryID { get; set; }
        public string Description { get; set; } = null!;
        public bool IsSoloProvider { get; set; }
        public string CoverImageUrl { get; set; }
        public string Location { get; set; }
    }
}
