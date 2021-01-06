using System.Collections.Generic;
using Server.Models;

namespace Server.Repositories
{
    public interface IFavoriteRepository : IRepository<Favorite>
    {
        List<Favorite> GetByUserId(int userId);
        
        List<Favorite> GetByClothesId(int clothesId);
    }
}