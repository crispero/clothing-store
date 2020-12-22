namespace Server.DTO
{
    public class ClothesDto
    {
        public int ClothesId { get; set; }
        
        public string Name { get; set; }
        
        public string Description { get; set; }

        public decimal Price { get; set; }
        
        public string PictureUrl { get; set; }
        
        public string Color { get; set; }
        
        public BrandDto Brand { get; set; }
    }
}