using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Dto;
using Server.DTO;

namespace Server.Services
{
    public interface IClothesService : IService<ClothesDto>
    {
        Task<List<ClothesDto>> GetClothesWithFilters(ClothesFilterDto options);
    }
}