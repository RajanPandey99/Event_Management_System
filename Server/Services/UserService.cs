using Server.Common;
using Server.DTOs;
using Server.Entities;
using Microsoft.EntityFrameworkCore;
namespace Server.Services
{
    public class UserService : IUserService
    {
        private readonly UserDbContext _dbContext;
        public UserService(UserDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        public async Task<ApiResponse> RegisterUser(RegisterUserRequest request)
        {
            User? existUser = await _dbContext.User.Where(u => u.Email == request.Email).FirstOrDefaultAsync();
            if(existUser != null)
            {
                return new ApiResponse { 
                    isSuccess = false,
                    Message = "User already exists"
                };
            }
            User user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Password = request.Password
            };
             _dbContext.User.Add(user);
            await _dbContext.SaveChangesAsync();
            return new ApiResponse
            {
                isSuccess = true,
                Message = "User registered successfully"
            };
        }

        public async Task<LoginUserResponse> LoginUser(LoginUserRequest request)
        {
           string? existEmail = _dbContext.User.Where(u => u.Email == request.Email).Select(u => u.Email).FirstOrDefault();
            if (existEmail == null)
            {
                return new LoginUserResponse
                {
                    isSuccess = false,
                    Message = "Email does not exist",
                };
            }

          string? existPassword = _dbContext.User.Where(u => u.Email == request.Email)
                                  .Select(u => u.Password).FirstOrDefault();
            if (existPassword == null || existPassword != request.Password) {
                return new LoginUserResponse
                {
                    isSuccess = false,
                    Message = "Incorrect Password",
                };
            }
              
            return new LoginUserResponse
            {
                isSuccess = true,
                Message = "Login Successful",
                User = _dbContext.User.Where(u => u.Email == request.Email).Select(u => new UserResponse
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email
                }).FirstOrDefault()
            };
        }

    }
}
