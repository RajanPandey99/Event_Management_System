using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entities
{
    public sealed class Joins
    {
        public int Id { get; init; }
        [Column("User_Id")]
        public required int userId { get; init; }
        [Column("Event_Id")]
        public required int eventId { get; init; }
    }
}
