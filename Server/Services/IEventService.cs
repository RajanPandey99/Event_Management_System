using Server.Common;
using Server.DTOs;
using Server.Entities;
namespace Server.Services
{
    public interface IEventService
    {
        public Task<ApiResponse> CreateEvent(CreateEventRequest request, int userId);
        public Task<List<EventResponse>> GetAllEvents(DateOnly? date);
        public Task<List<EventResponse>> GetUpCommingEvents(string? category, DateOnly? date);
        public Task<List<EventResponse>> GetEventsInRange(DateOnly start, DateOnly end);
        public Task<List<EventResponse>> GetPostedEvents(int userId);
    }
}
