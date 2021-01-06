using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Dto;

namespace Server.Services
{
    public interface IOrderService : IService<OrderDto>
    {
        List<OrderDto> GetByUserId(int userId);
    }
}