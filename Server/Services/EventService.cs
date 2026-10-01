using Server.Common;
using Server.DTOs;
using Server.Entities;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Collections.Immutable;
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
            DateOnly today = DateOnly.FromDateTime(DateTime.Today);
            if(request.DateOfEvent < today)
            {
                return new ApiResponse { isSuccess = false, Message = "Cannot add events in past !"};
            }
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
            return new ApiResponse
            {
                isSuccess = true,
                Message = "Event created successfully."
            };
        }

        public async Task<List<EventResponse>> GetAllEvents(DateOnly? date)
        {
            List<EventResponse> events = new List<EventResponse>();
            events = await _dbContext.Events.Where(e =>
                                          (date == null || e.DateOfEvent == date)).Select(e => new EventResponse
                                          {
                                              Id = e.Id,
                                              Title = e.Title,
                                              DateOfEvent = e.DateOfEvent,
                                              TimeOfEvent = e.TimeOfEvent,
                                              Location = e.Location,
                                              Category = e.Category,
                                              Description = e.Description ?? "",
                                              Count = _dbContext.Joins.Count(je => je.eventId == e.Id)
                                          }).ToListAsync();
            return events;

        }
        public async Task<List<EventResponse>> GetUpCommingEvents(string? Category, DateOnly? Date)
        {
            DateOnly today = DateOnly.FromDateTime(DateTime.Today);
            List<EventResponse> events = await _dbContext.Events
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

        public async Task<List<EventResponse>> GetPostedEvents(int userId)
        {
            List<EventResponse> events = await _dbContext.Events
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
            return events;
        }

        public async Task<List<EventResponse>> GetEventsInRange(DateOnly start, DateOnly end)
        {
            List<EventResponse> events = await _dbContext.Events
                              .Where(e => (start <= e.DateOfEvent) &&
                                          (e.DateOfEvent <= end))
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
    }
}
