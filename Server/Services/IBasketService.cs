using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Dto;

namespace Server.Services
{
    public interface IBasketService : IService<BasketDto>
    {
        Task<List<BasketDto>> GetByUserId(int userId);
    }
}