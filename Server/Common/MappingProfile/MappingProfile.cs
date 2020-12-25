using AutoMapper;
using Server.Dto;
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
            
            CreateMap<Favorite, FavoriteDto>();
            CreateMap<FavoriteDto, Favorite>();
            
            CreateMap<Basket, BasketDto>();
            CreateMap<BasketDto, Basket>();
            
            CreateMap<Comment, CommentDto>();
            CreateMap<CommentDto, Comment>();
            
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}