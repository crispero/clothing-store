using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Dto;
using Server.Models;

namespace Server.Repositories
{
    public interface IClothesRepository : IRepository<Clothes>
    {
        Task<List<Clothes>> GetClothesWithFilters(ClothesFilterDto options);
    }
}