using System.Collections.Generic;
using Server.Dto;

namespace Server.Services
{
    public interface IBasketService : IService<BasketDto>
    {
        List<BasketDto> GetByUserId(int userId);
        
        List<BasketDto> GetByClothesId(int clothesId);
    }
}