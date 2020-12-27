using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Repositories
{
    public interface IBasketRepository : IRepository<Basket>
    {
        List<Basket> GetByUserId(int userId);
    }
}