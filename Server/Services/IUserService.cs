using Server.Common;
using Server.DTOs;

namespace Server.Services
{
    public interface IUserService
    {
        public Task<ApiResponse> RegisterUser(RegisterUserRequest request);
        public Task<LoginUserResponse> LoginUser(LoginUserRequest request);
    }
}
