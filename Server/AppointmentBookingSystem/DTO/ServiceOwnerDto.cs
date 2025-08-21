namespace AppointmentBookingSystem.DTO
{
    public class ServiceOwnerDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } 
        public bool IsSoloProvider { get; set; }
        public string CategoryName { get; set; }
    }

    // For business registration response
    public class ServiceOwnerProfileDto
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsSoloProvider { get; set; }
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public List<ServiceOwnerServiceDto> Services { get; set; } = new List<ServiceOwnerServiceDto>();
    }
}
