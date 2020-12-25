using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Server.DTO;
using Server.Models;
using Server.Repositories;

namespace Server.Services.Impl
{
    public class ClothesService : IClothesService
    {
        private readonly IClothesRepository _clothesRepository;
        private readonly IMapper _entityMapper;

        public ClothesService(
            IClothesRepository clothesRepository,
            IMapper entityMapper
        )
        {
            _clothesRepository = clothesRepository;
            _entityMapper = entityMapper;
        }
        
        public async Task<List<ClothesDto>> GetAll()
        {
            var clothesList = await _clothesRepository.GetAll();
            return GetClothesDtoList(clothesList);
        }

        public async Task<ClothesDto> GetById(int id)
        {
            var clothes = await _clothesRepository.GetById(id);
            return GetClothesDto(clothes);
        }

        public async Task<List<ClothesDto>> GetByIds(List<int> ids)
        {
            var clothesList = await _clothesRepository.GetByIds(ids);
            return GetClothesDtoList(clothesList);
        }

        public async Task<ClothesDto> Create(ClothesDto dto)
        {
            var clothes = _entityMapper.Map<Clothes>(dto);
            var createdClothes = await _clothesRepository.Create(clothes);
            return GetClothesDto(createdClothes);
        }

        public async Task<ClothesDto> Update(int id, ClothesDto dto)
        {
            var clothes = _entityMapper.Map<Clothes>(dto);
            var updatedClothes = await _clothesRepository.Update(id, clothes);
            return GetClothesDto(updatedClothes);
        }

        public Task<bool> Delete(int id)
        {
            return _clothesRepository.Delete(id);
        }

        private ClothesDto GetClothesDto(Clothes clothes)
        {
            return _entityMapper.Map<ClothesDto>(clothes);
        }

        private List<ClothesDto> GetClothesDtoList(List<Clothes> clothesList)
        {
            return clothesList.Select(GetClothesDto).ToList();
        }
    }
}