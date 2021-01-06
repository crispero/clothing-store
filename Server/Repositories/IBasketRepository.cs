using System.Collections.Generic;
using Server.Models;

namespace Server.Repositories
{
    public interface IBasketRepository : IRepository<Basket>
    {
        List<Basket> GetByUserId(int userId);
        
        List<Basket> GetByClothesId(int clothesId);
    }
}