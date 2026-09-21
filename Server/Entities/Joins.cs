using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entities
{
    public sealed class Joins
    {
        public int Id { get; set; }
        [Column("User_Id")]
        public required int userId { get; set; }
        [Column("Event_Id")]
        public required int eventId { get; set; }
    }
}
