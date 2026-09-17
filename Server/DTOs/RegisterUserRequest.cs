using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class RegisterUserRequest
    {
        [Required(ErrorMessage = "Name is required")]
        public required string Name { get; init; }
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public required string Email { get; init; }
        [Required(ErrorMessage = "Password is required")]
        public required string Password { get; init; }
    }
}
