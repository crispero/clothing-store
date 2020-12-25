using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class FavoriteDto
    {
        public int FavoriteId { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public int ClothesId { get; set; }
    }
}