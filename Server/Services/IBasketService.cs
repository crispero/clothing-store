using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Dto;

namespace Server.Services
{
    public interface IBasketService : IService<BasketDto>
    {
        List<BasketDto> GetByUserId(int userId);
    }
}