using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class BasketDto
    {
        public int BasketId { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public int ClothesId { get; set; }
    }
}