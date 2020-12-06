using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("order_x_clothes")]
    public class OrderXClothes
    {
        [Key]
        [Column("order_x_clothes_id")]
        public int OrderXClothesId { get; set; }
        
        [Required]
        [Column("order_id")]
        public int OrderId { get; set; }
        
        [Required]
        [Column("clothes_id")]
        public int ClothesId { get; set; }
        
        [ForeignKey(nameof(OrderId))]
        public virtual Order Order { get; set; }
        
        [ForeignKey(nameof(ClothesId))]
        public virtual Clothes Clothes { get; set; }
    }
}