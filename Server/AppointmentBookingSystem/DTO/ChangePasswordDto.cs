namespace AppointmentBookingSystem.DTO
{
    public class ChangePasswordDto
    {
            public string CurrentPassword { get; set; }   // old password
            public string NewPassword { get; set; }       // new password
            public string ConfirmPassword { get; set; }    
    }
}
