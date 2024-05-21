using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models
{
    public class Context: IdentityDbContext
    {
        public Context()
        {
        }
        public Context(DbContextOptions<Context> options) : base(options)
        {

        }
        /*protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Order>()
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(b => b.applicationId);
        }*/
        public DbSet<Book> books { get; set; }
        public DbSet<ApplicationUser> applicationUsers { get; set; }
        public DbSet<Order> orders { get; set; }
        public DbSet<Event> events { get; set; }
        public DbSet<Author> authors { get; set; }

    }
}
