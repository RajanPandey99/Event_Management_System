using Microsoft.AspNetCore.Mvc;
using Server.Common;
using Server.DTOs;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/join")]
    public class JoinController :ControllerBase
    {
        private readonly IJoinService _joinService;
        public JoinController(IJoinService joinService)
        {
            _joinService = joinService;
        }


        [HttpPost]
        public async Task<IActionResult> JoinEvent([FromBody] int eventId, [FromHeader] string? Id)
        {
            if (string.IsNullOrEmpty(Id))
            {
                return Unauthorized(new { Message = "User is not authenticated" });
            }
            int userId = int.Parse(Id);
            try
            {
                ApiResponse response = await _joinService.JoinEvent(eventId, userId);
                if (!response.isSuccess)
                {
                    return BadRequest(new { response.Message });
                }
                return Ok(new { response.Message });
            }
            catch (Exception)
            {
                return BadRequest(new { Message = "Unable to join event" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetJoinedEvents([FromHeader] string? Id)
        {
            if (string.IsNullOrEmpty(Id))
            {
                return Unauthorized(new { Message = "User is not authenticated" });
            }
            int userId = int.Parse(Id);
            try
            {
                List<EventResponse>? events = await _joinService.getJoinedEvents(userId);
                if (events == null)
                {
                    return NotFound(new { Message = "No joined events found" });
                }
                return Ok(events);
            }
            catch (Exception)
            {
                return BadRequest(new { Message = "Unable to retrieve joined events" });
            }
        }
        
        [HttpDelete("{eventId}")]
        public async Task<IActionResult> LeaveEvent(int eventId, [FromHeader] string? Id)
        {
            if (string.IsNullOrEmpty(Id))
            {
                return Unauthorized(new { Message = "User is not authenticated" });
            }
            int userId = int.Parse(Id);
            try
            {
                ApiResponse response = await _joinService.LeaveEvent(eventId, userId);
                if (!response.isSuccess)
                {
                    return BadRequest(new { response.Message });
                }
                return Ok(new { response.Message });
            }
            catch (Exception)
            {
                return BadRequest(new { Message = "Unable to leave event" });
            }
        }


        [HttpGet("joinedevents")]
        public async Task<IActionResult> GetJoinedEventIds([FromHeader] string? Id)
        {
            if (string.IsNullOrEmpty(Id))
            {
                return Unauthorized(new { Message = "User is not authenticated" });
            }
            int userId = int.Parse(Id);
            List<int> eventIds = await _joinService.getJoinedEventIds(userId);
            return Ok(eventIds);
        }
    }
}
