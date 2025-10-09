namespace AppointmentBookingSystem.DTO
{
    public class ServiceCategoryDto
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string IconKey { get; set; }
        public List<ServiceOwnerDto> ServiceOwners { get; set; } = new List<ServiceOwnerDto>();
    }
}
