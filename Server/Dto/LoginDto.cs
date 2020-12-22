using System.ComponentModel.DataAnnotations;

namespace Server.DTO
{
    public class LoginDto
    {
        [Required]
        public string Login { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}