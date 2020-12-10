using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Application
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            base.OnConfiguring(builder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(user => new { user.UserId });
            modelBuilder.Entity<Clothes>().HasKey(clothes => new { clothes.ClothesId });
            modelBuilder.Entity<Basket>().HasKey(basket => new { basket.BasketId });
            modelBuilder.Entity<ClothesCounter>().HasKey(clotheCounter => new { clotheCounter.ClothesCounterId });
            modelBuilder.Entity<Favorite>().HasKey(favorite => new { favorite.FavoriteId });
            modelBuilder.Entity<Order>().HasKey(order => new { order.OrderId });
            modelBuilder.Entity<OrderXClothes>().HasKey(orderXClothes => new { orderXClothes.OrderXClothesId });
            modelBuilder.Entity<Comment>().HasKey(comment => new { comment.CommentId });
        }
        
        public DbSet<UserType> UserTypes { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Clothes> Clothes { get; set; }

        public DbSet<Comment> Comment { get; set; }

        public DbSet<Basket> Basket { get; set; }

        public DbSet<Favorite> Favorite { get; set; }

        public DbSet<Brand> Brand { get; set; }

        public DbSet<Order> Order { get; set; }
    }
}