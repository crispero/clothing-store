using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("user_type")]
    public class UserType
    {
        [Key]
        [Column("user_type_id")]
        public int UserTypeId { get; set; }

        [Column("name")]
        [StringLength(255)]
        public string Name { get; set; }
    }
}