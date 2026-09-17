namespace Server.DTOs
{
    public class EventResponse
    {
        public required int Id { get; init; }
        public required string Title { get; init; }
        public DateOnly DateOfEvent { get; init; }
        public TimeOnly TimeOfEvent { get; init; }
        public required string Category { get; init; }
        public required string Location { get; init; }
        public string? Description { get; init; } = "";
        public int Count { get; set; }
    }
}
