using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class OrderDto
    {
        public int OrderId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public decimal Price { get; set; }

        public ushort Status { get; set; }

        [Required]
        public string DeliveryAddress { get; set; }

        public string CreatedDate { get; set; }

        [Required]
        public List<int> ClothesIds { get; set; }
    }
}