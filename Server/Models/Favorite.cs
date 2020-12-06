using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("favorite")]
    public class Favorite
    {
        [Key]
        [Column("favorite_id")]
        public int FavoriteId { get; set; }
        
        [Required]
        [Column("user_id")]
        public int UserId { get; set; }
        
        [Required]
        [Column("clothes_id")]
        public int ClothesId { get; set; }
        
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }
        
        [ForeignKey(nameof(ClothesId))]
        public virtual Clothes Clothes { get; set; }
    }
}