using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Dto;

namespace Server.Services
{
    public interface IOrderClothesService : IService<OrderXClothesDto>
    {
        List<OrderXClothesDto> GetByOrderId(int orderId);
    }
}