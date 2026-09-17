using Server.Common;
using Server.DTOs;
using Server.Entities;
using Microsoft.EntityFrameworkCore;
namespace Server.Services
{

    public class EventService : IEventService
    {
        private readonly UserDbContext _dbContext;
        public EventService(UserDbContext context)
        {
            this._dbContext = context;
        }   
        public async Task<ApiResponse> CreateEvent(CreateEventRequest request, int userId)
        { 



           Events newEvent = new Events
           {
               Title = request.Title,
               DateOfEvent = request.DateOfEvent,
               TimeOfEvent = request.TimeOfEvent,
               Category = request.Category,
               Location = request.Location,
               Description = request.Description,
               CreatedBy = userId
           };

            await _dbContext.Events.AddAsync(newEvent);
            await _dbContext.SaveChangesAsync();
            return new ApiResponse {
                isSuccess = true,
                Message = "Event created successfully." };  
        }

       public async Task<List<EventResponse>?> GetEvenyByDateAndCategory(string? Category, DateOnly? Date)
        {
            DateOnly today = DateOnly.FromDateTime(DateTime.Today);
            List<EventResponse>? events = await _dbContext.Events
                              .Where(e => (Category == null || e.Category == Category) &&
                                          (Date == null || e.DateOfEvent == Date) && e.DateOfEvent >= today)
                                          .Select(e => new EventResponse
                                          {
                                              Id = e.Id,
                                              Title = e.Title,
                                              DateOfEvent = e.DateOfEvent,
                                              TimeOfEvent = e.TimeOfEvent,
                                              Category = e.Category,
                                              Location = e.Location,
                                              Description = e.Description ?? "",
                                              Count = _dbContext.Joins.Count(je => je.eventId == e.Id)
                                          })    
                                          .ToListAsync();

            return events;
        }

        public async Task<List<EventResponse>> getPostedEvents(int userId)
        {
            List<EventResponse>? events = await _dbContext.Events
                              .Where(e => e.CreatedBy == userId)
                              .Select(e => new EventResponse
                              {
                                  Id = e.Id,
                                  Title = e.Title,
                                  DateOfEvent = e.DateOfEvent,
                                  TimeOfEvent = e.TimeOfEvent,
                                  Category = e.Category,
                                  Location = e.Location,
                                  Description = e.Description ?? "",
                                  Count = _dbContext.Joins.Count(je => je.eventId == e.Id)
                              })
                              .ToListAsync();
            if(events == null)
            {
                List<EventResponse> response = new();
                return response;
            }
            return events;
        }
    }
}
