using Microsoft.AspNetCore.Mvc;
using Server.Services;
using Server.DTOs;
using Server.Common;

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
        public async Task<IActionResult> CreateEvent([FromBody] CreateEventRequest request, [FromHeader] string Id)
        {
            Console.WriteLine(Id);
            int userId = int.Parse(Id);
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid data" });
            }
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
                if (events == null || events.Count == 0)
                {
                    List<EventResponse> emptyEvent = new();
                    return Ok(emptyEvent);
                }
                return Ok(events);
            }
            catch (Exception)
            {
                return BadRequest(new { Message = "Unable to retrieve events" });
            }
        }

        [HttpGet("posted")]
        public async Task<IActionResult> GetPostedEvents([FromHeader] string Id)
        {
            int userId = int.Parse(Id);
            try
            {
                List<EventResponse> events = await _eventService.getPostedEvents(userId);
                return Ok(events);
            }
            catch (Exception)
            {
                return BadRequest(new { Message = "Unable to retrieve posted events" });
            }
        }
    }
}
