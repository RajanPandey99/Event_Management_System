using Azure;
using Microsoft.AspNetCore.Mvc;
using Server.Common;
using Server.DTOs;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/event")]
    public class EventController :ControllerBase
    {
        private readonly IEventService _eventService;
        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] CreateEventRequest request, [FromHeader] string? Id)
        {
            if (String.IsNullOrEmpty(Id))
            {
                return Unauthorized("User is not authenticated !");
            }
            if (!CheckUser.ValidateUser(Id).isSuccess)
            {
                return BadRequest(new { Message = "Invalid User Id" });
            }
            int userId = int.Parse(Id);
            try
            {
                ApiResponse response = await _eventService.CreateEvent(request, userId);
                if (!response.isSuccess)
                {
                    return BadRequest(new { response.Message });
                }
                return Ok(new { response.Message });
            }
            catch (Exception)
            {
                return BadRequest(new { Message = "Unable to create event" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents([FromQuery] string? category, [FromQuery] DateOnly? date)
        {
            try
            {
                List<EventResponse>? events = await _eventService.GetEvenyByDateAndCategory(category, date);
                return Ok(events ?? []);
            }
            catch (Exception)
            {
                return BadRequest(new { Message = "Unable to retrieve events" });
            }
        }

        [HttpGet("posted")]
        public async Task<IActionResult> GetPostedEvents([FromHeader] string? Id)
        {
            if (String.IsNullOrEmpty(Id))
            {
                return Unauthorized("User is not authenticated !");
            }
            if (!CheckUser.ValidateUser(Id).isSuccess)
            {
                return BadRequest(new { Message = "Invalid User Id" });
            }
            int userId = int.Parse(Id);
            try
            {
                List<EventResponse> events = await _eventService.GetPostedEvents(userId);
                return Ok(events);
            }
            catch (Exception)
            {
                return BadRequest(new { Message = "Unable to retrieve posted events" });
            }
        }
    }
}
