using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Repositories
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<List<Order>> GetByUserId(int userId);
    }
}