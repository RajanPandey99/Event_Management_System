using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entities
{
    //[Table("User")]
    public sealed class User
    {
        [Key]
        public int Id { get; init; }
        public required string Name { get; init; }

        [EmailAddress]
        public required string Email { get; init; }

        [Required]
        public required string Password { get; init; }
    }
}
