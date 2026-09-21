using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entities
{
    public sealed class Events
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        [Column("Date_Of_Event")]
        public DateOnly DateOfEvent { get; set; }
        [Column("Time_Of_Event")]
        public TimeOnly TimeOfEvent { get; set; }
        public required string Category { get; set; }    
        public required string Location { get; set; }
        public string? Description { get; set; }

        [Column("Created_By")]
        public required int CreatedBy { get; set; }
    }
}
