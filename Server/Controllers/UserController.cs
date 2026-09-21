using Microsoft.AspNetCore.Mvc;
using Server.Common;
using Server.DTOs;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/user")]
    public sealed class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)   
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserRequest request)
        {
            try
            {
               ApiResponse response = await _userService.RegisterUser(request);
                if (!response.isSuccess)
                {
                    return BadRequest(new {response.Message});
                }
                return Ok(new {response.Message });
            }
            catch (Exception) {
                return BadRequest(new { Message = "Unable to register user" });
            }      
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginUserRequest request)
        {
            try
            {
                var response = await _userService.LoginUser(request);
                if (!response.isSuccess)
                {
                    return BadRequest(new { Message = response.Message??"Something went wrong !" });
                }
                return Ok(response.User);
            }
            catch (Exception) {
                return BadRequest(new { Message = "Unable to login user" });
            }      
        }
    }
}
