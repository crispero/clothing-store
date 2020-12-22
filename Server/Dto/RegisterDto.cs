using System.ComponentModel.DataAnnotations;

namespace Server.DTO
{
    public class RegisterDto
    {
        [Required]
        public string Login { get; set; }
        
        [Required]
        public string Password { get; set; }
        
        public string Name { get; set; }
        
        public string Surname { get; set; }
    }
}