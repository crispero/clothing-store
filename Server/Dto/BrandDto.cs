using System.ComponentModel.DataAnnotations;

namespace Server.DTO
{
    public class BrandDto
    {
        public int BrandId { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public string LogoUrl { get; set; }
    }
}