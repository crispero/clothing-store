using System.ComponentModel.DataAnnotations;

namespace Server.DTO
{
    public class ClothesDto
    {
        public int ClothesId { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }
        
        public string PictureUrl { get; set; }
        
        public string Color { get; set; }

        [Required]
        public ushort GenderType { get; set; }
        
        [Required]
        public ushort Size { get; set; }
        
        public bool IsOrdered { get; set; }
        
        [Required]
        public int BrandId { get; set; }
    }
}