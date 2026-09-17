using Server.Common;
using Server.DTOs;
using Server.Entities;
namespace Server.Services
{
    public interface IEventService
    {
        public Task<ApiResponse> CreateEvent(CreateEventRequest request, int userId);
        public Task<List<EventResponse>?> GetEvenyByDateAndCategory(string? category, DateOnly? date);
        public Task<List<EventResponse>> getPostedEvents(int userId);
    }
}
