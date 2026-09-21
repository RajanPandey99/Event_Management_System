using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entities
{
    //[Table("User")]
    public sealed class User
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }

        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}
