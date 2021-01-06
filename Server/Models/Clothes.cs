using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("clothes")]
    public class Clothes
    {
        [Key]
        [Column("clothes_id")]
        public int ClothesId { get; set; }
        
        [Required]
        [Column("brand_id")]
        public int BrandId { get; set; }
        
        [Column("name")]
        [StringLength(255)]
        public string Name { get; set; }
        
        [Column("price", TypeName = "decimal(18,4)")]
        public decimal Price { get; set; }
        
        [Column("gender_type", TypeName = "tinyint")]
        public ushort GenderType { get; set; }
        
        [Column("size", TypeName = "tinyint")]
        public ushort Size { get; set; }
        
        [Column("picture_url")]
        [StringLength(255)]
        public string PictureUrl { get; set; }
        
        [Column("description")]
        [StringLength(1024)]
        public string Description { get; set; }
        
        [Column("color")]
        [StringLength(255)]
        public string Color { get; set; }
        
        [Column("is_ordered")]
        public bool IsOrdered { get; set; }
        
        [ForeignKey(nameof(BrandId))]
        public virtual Brand Brand { get; set; }
    }
}