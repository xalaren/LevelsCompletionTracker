using LevelsCompletionTracker.Core.Model;
using Microsoft.EntityFrameworkCore;

namespace LevelsCompletionTracker.Adapter.ContextsEF
{
    public class AppDbContext : DbContext
    {
        public DbSet<Level> Levels { get; set; }
        public DbSet<Progress> Progresses { get; set; }
        public DbSet<ProgressContainer> ProgressContainers { get; set; }

        public AppDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Level>()
                .Property(level => level.Name)
                .HasMaxLength(50);

            modelBuilder.Entity<Level>()
                .Property(level => level.Difficulty)
                .HasMaxLength(10);

            modelBuilder.Entity<Level>()
                .Property(level => level.Status)
                .HasMaxLength(10);
        }
    }
}
