using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entities
{
    public sealed class Events
    {
        public int Id { get; init; }
        public required string Title { get; init; }
        [Column("Date_Of_Event")]
        public DateOnly DateOfEvent { get; init; }
        [Column("Time_Of_Event")]
        public TimeOnly TimeOfEvent { get; init; }
        public required string Category { get; init; }    
        public required string Location { get; init; }
        public string? Description { get; init; }

        [Column("Created_By")]
        public required int CreatedBy { get; init; }
    }
}
