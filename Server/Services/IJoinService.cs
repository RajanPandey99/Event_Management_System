using Server.Common;
using Server.DTOs;

namespace Server.Services
{
    public interface IJoinService
    {
        public Task<ApiResponse> JoinEvent(int eventId, int userId);
        public Task<List<EventResponse>> getJoinedEvents(int userId);
        public Task<List<int>> getJoinedEventIds(int userId);
        public Task<ApiResponse> LeaveEvent(int eventId, int userId);
    }
}
