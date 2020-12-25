using System;
using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class CommentDto
    {
        public int CommentId { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public int ClothesId { get; set; }
        
        [Required]
        public string Text { get; set; }
        
        public DateTime CreatedDate { get; set; }
    }
}