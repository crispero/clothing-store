using AutoMapper;
using Server.DTO;
using Server.Models;

namespace Server.Common.MappingProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile ()
        {
            CreateMap<Clothes, ClothesDto>();
            CreateMap<ClothesDto, Clothes>();
            
            CreateMap<Brand, BrandDto>();
            CreateMap<BrandDto, Brand>();
        }
    }
}