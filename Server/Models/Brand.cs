using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("brand")]
    public class Brand
    {
        [Key]
        [Column("brand_id")]
        public int BrandId { get; set; }
        
        [Column("name")]
        [StringLength(255)]
        public string Name { get; set; }
        
        [Column("description")]
        [StringLength(1024)]
        public string Description { get; set; }
        
        [Column("logo_url")]
        [StringLength(255)]
        public string LogoUrl { get; set; }
    }
}