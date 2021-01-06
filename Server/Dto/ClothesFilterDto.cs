namespace Server.Dto
{
    public class ClothesFilterDto
    {
        public string Name { get; set; }
        
        public ushort GenderType { get; set; }
        
        public ushort Size { get; set; }
        
        public bool IsOrdered { get; set; }
    }
}