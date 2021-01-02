using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Repositories
{
    public interface IOrderClothesRepository : IRepository<OrderXClothes>
    {
        Task<List<OrderXClothes>> GetByOrderId(int orderId);
    }
}