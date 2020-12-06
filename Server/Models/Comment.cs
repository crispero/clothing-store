using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("comment")]
    public class Comment
    {
        [Key]
        [Column("comment_id")]
        public int CommentId { get; set; }
        
        [Required]
        [Column("user_id")]
        public int UserId { get; set; }
        
        [Required]
        [Column("clothes_id")]
        public int ClothesId { get; set; }
        
        [Required]
        [Column("text")]
        [StringLength(1024)]
        public string Text { get; set; }
        
        [Column("created_date")]
        [DataType(DataType.DateTime)]
        public DateTime CreatedDate { get; set; }
        
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }
        
        [ForeignKey(nameof(ClothesId))]
        public virtual Clothes Clothes { get; set; }
    }
}