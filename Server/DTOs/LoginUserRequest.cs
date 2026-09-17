using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class LoginUserRequest
    {
        public required string Email { get; init; }
        public required string Password { get; init; }
    }
}
