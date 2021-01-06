using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Repositories
{
    public interface IOrderClothesRepository : IRepository<OrderXClothes>
    {
        List<OrderXClothes> GetByOrderId(int orderId);
    }
}