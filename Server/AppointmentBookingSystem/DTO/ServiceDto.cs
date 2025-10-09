namespace AppointmentBookingSystem.DTO
{
    public sealed class ServiceDto
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int DurationMinutes { get; set; }
        public string DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int ServiceOwnerID { get; set; }
        public string ServiceOwnerName { get; set; }
        public string CategoryName { get; set; }

    }

    public class ServiceOwnerServiceDto
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int DurationMinutes { get; set; }
        public int MaxAppointmentsPerDay { get; set; }
        public string DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        public string CoverImageUrl { get; set; }
    }
}
