using System.Collections.Generic;
using Server.Dto;

namespace Server.Services
{
    public interface IFavoriteService : IService<FavoriteDto>
    {
        List<FavoriteDto> GetByUserId(int userId);

        List<FavoriteDto> GetByClothesId(int clothesId);
    }
}