namespace AppointmentBookingSystem.ViewModel
{
    public class RegisterVM
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } // Admin/User/ServiceProvider
    }
}
