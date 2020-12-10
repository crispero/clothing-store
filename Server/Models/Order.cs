using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("order")]
    public class Order
    {
        [Key]
        [Column("order_id")]
        public int OrderId { get; set; }
        
        [Required]
        [Column("user_id")]
        public int UserId { get; set; }
        
        [Column("price", TypeName = "decimal(18,4)")]
        public decimal Price { get; set; } 
        
        [Column("status", TypeName = "tinyint")]
        public ushort Status { get; set; }

        [Column("delivery_address")]
        [StringLength(255)]
        public string DeliveryAddress { get; set; }
        
        [Column("created_date")]
        [DataType(DataType.DateTime)]
        public DateTime CreatedDate { get; set; }
        
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }
    }
}