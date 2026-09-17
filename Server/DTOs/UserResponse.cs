using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class UserResponse
    {
        public int Id { get; init; }
        public required string Name { get; init; }

        [EmailAddress]
        public required string Email { get; init; }
    }
}
