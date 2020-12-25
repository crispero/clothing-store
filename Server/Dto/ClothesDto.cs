using System.ComponentModel.DataAnnotations;

namespace Server.DTO
{
    public class ClothesDto
    {
        public int ClothesId { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        public string Description { get; set; }

        public decimal Price { get; set; }
        
        public string PictureUrl { get; set; }
        
        public string Color { get; set; }
        
        [Required]
        public int BrandId { get; set; }
    }
}