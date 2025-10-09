namespace AppointmentBookingSystem.ViewModel
{
    public class UpdateServiceVM
    {
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int DurationMinutes { get; set; } = 10;
        public decimal Price { get; set; } = 5;
        public int MaxAppointmentsPerDay { get; set; } = 5;
        public string DayOfWeek { get; set; } = null!;
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string CoverImageUrl { get; set; }
    }
}