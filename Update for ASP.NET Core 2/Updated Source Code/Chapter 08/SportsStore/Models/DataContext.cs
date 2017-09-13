using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SportsStore.Models {

    public class DataContext : DbContext {

        public DataContext(DbContextOptions<DataContext> opts)
            : base(opts) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Rating> Ratings { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Product>().HasMany<Rating>(p => p.Ratings)
                .WithOne(r => r.Product).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Product>().HasOne<Supplier>(p => p.Supplier)
                .WithMany(s => s.Products).OnDelete(DeleteBehavior.SetNull);
        }
    }
}
