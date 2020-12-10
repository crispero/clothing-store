using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("user")]
    public class User
    {
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }
        
        [Required]
        [Column("user_type_id")]
        public int UserTypeId { get; set; }
        
        [Required]
        [Column("login")]
        [StringLength(255)]
        public string Login { get; set; }
        
        [Required]
        [Column("password")]
        [StringLength(255)]
        public string Password { get; set; }
        
        [Column("name")]
        [StringLength(255)]
        public string Name { get; set; }
        
        [Column("surname")]
        [StringLength(255)]
        public string Surname { get; set; }
        
        [Column("address")]
        [StringLength(255)]
        public string Address { get; set; }
        
        [Column("picture_url")]
        [StringLength(255)]
        public string PictureUrl { get; set; }
        
        [Column("gender_type", TypeName = "tinyint")]
        public ushort GenderType { get; set; }
        
        [ForeignKey(nameof(UserTypeId))]
        public virtual UserType UserType { get; set; }
        
    }
}