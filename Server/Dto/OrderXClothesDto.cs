using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class OrderXClothesDto
    {
        public int OrderXClothesId { get; set; }
        
        [Required]
        public int OrderId { get; set; }
        
        [Required]
        public int ClothesId { get; set; }
    }
}