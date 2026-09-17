using Server.Common;
using Server.DTOs;
using Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace Server.Services
{
    public class JoinService : IJoinService
    {
        public UserDbContext _dbContext;
        public JoinService(UserDbContext context)
        {
            _dbContext = context;
        }
        
        public async Task<ApiResponse> JoinEvent(int eventId, int userId)
        {
            Joins? alreadyJoin = _dbContext.Joins.FirstOrDefault(j => j.userId == userId && j.eventId == eventId);
            
            if(alreadyJoin != null)
            {
                return new ApiResponse
                {
                    isSuccess = false,
                    Message = "User has already joined this event."
                };
            }
            int createdBy = await _dbContext.Events.Where(e => e.Id == eventId).Select(e => e.CreatedBy).FirstOrDefaultAsync();
            if(createdBy == userId)
            {
                return new ApiResponse
                {
                    isSuccess = false,
                    Message = "User cannot join their own event."
                };
            }

            Joins newJoin = new Joins
            {
                userId = userId,
                eventId = eventId
            };
            _dbContext.Joins.Add(newJoin);
            await _dbContext.SaveChangesAsync();

            return new ApiResponse
            {
                isSuccess = true,
                Message = "User joined the event successfully."
            };
        }

        public async Task<List<EventResponse>> getJoinedEvents(int userId)
        {
            List<int> eventsId = await _dbContext.Joins
                                          .Where(j => j.userId == userId)
                                          .Select(e => e.eventId)
                                          .ToListAsync();

            List<EventResponse> events = new List<EventResponse>();
            foreach (int id in eventsId)
            {
                EventResponse? eventResponse = await _dbContext.Events
                                              .Where(e => e.Id == id && e.CreatedBy != userId)
                                              .Select(e => new EventResponse
                                              {
                                                  Id = e.Id,
                                                  Title = e.Title,
                                                  Category = e.Category,
                                                  DateOfEvent = e.DateOfEvent,
                                                  TimeOfEvent = e.TimeOfEvent,
                                                  Location = e.Location,
                                                  Description = e.Description ?? "",
                                                  Count = _dbContext.Joins.Count(je => je.eventId == e.Id)
                                              })
                                              .FirstOrDefaultAsync();
                if (eventResponse != null)
                {
                    events.Add(eventResponse);
                }
            }
            return events;
        }

    }
}
