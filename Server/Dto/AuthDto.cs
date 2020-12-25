using System.ComponentModel.DataAnnotations;

namespace Server.DTO
{
    public class AuthDto
    {
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public string AccessToken { get; set; }
    }
}