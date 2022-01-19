using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactExcuses.Data
{
    public class ExcusesDbContext : DbContext
    {
        private readonly string _connectionString;
        public ExcusesDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.Entity<UserLikedExcuses>()
                .HasKey(ule => new { ule.ExcuseId, ule.UserId });

            modelBuilder.Entity<UserLikedExcuses>()
                .HasOne(ule => ule.User)
                .WithMany(u => u.UserLikedExcuses)
                .HasForeignKey(u => u.UserId);

            modelBuilder.Entity<UserLikedExcuses>()
                .HasOne(ule => ule.Excuse)
                .WithMany(j => j.UserLikedExcuses)
                .HasForeignKey(j => j.ExcuseId);

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<ExcuseApiItem> Excuses { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserLikedExcuses> UserLikedExcuses { get; set; }
    }
}