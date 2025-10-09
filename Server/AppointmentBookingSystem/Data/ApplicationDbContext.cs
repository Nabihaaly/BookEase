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
                new ServiceCategory { ID = 1, Name = "Salon & Beauty", Description = "Hair, nails, skincare & beauty treatments", IconKey = "salon" },
                new ServiceCategory { ID = 2, Name = "Medical Services", Description = "Healthcare appointments & consultations", IconKey = "medical" },
                new ServiceCategory { ID = 3, Name = "Consulting Services", Description = "Professional consultancy services", IconKey = "consultant" },
                new ServiceCategory { ID = 4, Name = "Fitness & Wellness", Description = "Personal training & wellness coaching", IconKey = "fitness" },
                new ServiceCategory { ID = 5, Name = "Freelancer Services", Description = "Independent professionals for various tasks", IconKey = "services" },
                new ServiceCategory { ID = 6, Name = "Home Services", Description = "Cleaning, repairs & maintenance", IconKey = "home" }
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
