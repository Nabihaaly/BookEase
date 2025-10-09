namespace AppointmentBookingSystem.DTO
{
    public class AppointmentDto
    {
        public int Id { get; set; }
        public DateTime AppointmentDateTime { get; set; }
        public string Status { get; set; }
        public int ServiceID { get; set; }
        public string ServiceTitle { get; set; }
        public decimal ServicePrice { get; set; }

        public int DurationMinutes { get; set; }
        public string ServiceOwnerName { get; set; } = null!;
    }
    // Service owner appointment DTO (includes user info)
    public class ServiceOwnerAppointmentDto
    {
        public int Id { get; set; }
        public DateTime AppointmentDateTime { get; set; }
        public string Status { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string ServiceTitle { get; set; }
        public decimal ServicePrice { get; set; }
    }
}