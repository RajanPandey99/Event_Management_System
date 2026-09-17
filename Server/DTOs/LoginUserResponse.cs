using Server.Entities;
namespace Server.DTOs
{
    public class LoginUserResponse
    {
         public required bool isSuccess { get; init; }
        public required string Message { get; init; }
        public UserResponse? User { get; init; }
    }
}
