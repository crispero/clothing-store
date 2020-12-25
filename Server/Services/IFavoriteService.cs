using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Dto;

namespace Server.Services
{
    public interface IFavoriteService : IService<FavoriteDto>
    {
        Task<List<FavoriteDto>> GetByUserId(int userId);
    }
}