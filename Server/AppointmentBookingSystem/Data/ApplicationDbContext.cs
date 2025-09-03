using AppointmentBookingSystem.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AppointmentBookingSystem.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

        public DbSet<ServiceCategory> ServiceCategories { get; set; }
        public DbSet<ServiceOwner> ServiceOwners { get; set; } // ✅ Corrected name
        public DbSet<Service> Services { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ✅ Seed initial Service Categories
            modelBuilder.Entity<ServiceCategory>().HasData(
                new ServiceCategory { ID = 1, Name = "Salon" },
                new ServiceCategory { ID = 2, Name = "Clinic" },
                new ServiceCategory { ID = 3, Name = "Consultant" },
                new ServiceCategory { ID = 4, Name = "Fitness & Wellness" },
                new ServiceCategory { ID = 5, Name = "Freelancer" },
                new ServiceCategory { ID = 6, Name = "Home Services" }
            );

            // ✅ Relationships
            modelBuilder.Entity<ServiceOwner>() //Ensures 1 user = 1 business/freelancer profile.
                .HasOne(sp => sp.User)
                .WithOne(u => u.ServiceOwner)
                .HasForeignKey<ServiceOwner>(sp => sp.UserID);

            modelBuilder.Entity<ServiceOwner>()
                .HasOne(sp => sp.Category)
                .WithMany(c => c.ServiceOwners)
                .HasForeignKey(sp => sp.CategoryID);

            modelBuilder.Entity<Service>()
                .HasOne(s => s.ServiceOwner)
                .WithMany(sp => sp.Services)
                .HasForeignKey(s => s.ServiceOwnerID);

            // 👇 Cascade delete on User (Appointments will be deleted when User is deleted)
            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.User)
                .WithMany(u => u.Appointments)
                .HasForeignKey(a => a.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            // 👇 Restrict delete on Service (Appointments will NOT be deleted automatically)
            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Service)
                .WithMany()
                .HasForeignKey(a => a.ServiceID)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
