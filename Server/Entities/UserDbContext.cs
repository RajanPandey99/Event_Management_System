using Microsoft.EntityFrameworkCore;

namespace Server.Entities
{
    public class UserDbContext : DbContext
    { 
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
        }

       public DbSet<User> User { get; set; }
        public DbSet<Events> Events { get; set; }
        public DbSet<Joins> Joins { get; set; }
    }
}
