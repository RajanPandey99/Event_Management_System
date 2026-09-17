namespace Server.DTOs
{
    public class JoinEventRequest
    {
        public required int userId { get; init;  }
        public required int eventId { get; init; }
    }
}
