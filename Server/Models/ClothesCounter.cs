using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("clothes_counter")]
    public class ClothesCounter
    {
        [Key]
        [Column("clothes_counter_id")]
        public int ClothesCounterId { get; set; }
        
        [Required]
        [Column("clothes_id")]
        public int ClothesId { get; set; }
        
        [Column("size", TypeName = "tinyint")]
        public ushort Size { get; set; }
        
        [Column("count")]
        public int Count { get; set; }
        
        [ForeignKey(nameof(ClothesId))]
        public virtual Clothes Clothes { get; set; }
    }
}