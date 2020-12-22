using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Common;
using Server.DTO;
using Server.Models;
using Server.Repositories;

namespace Server.Services.Impl
{
    public class ClothesService : IClothesService
    {
        private readonly IClothesRepository _clothesRepository;
        private readonly IBrandRepository _brandRepository;
        private readonly EntityMapper _entityMapper;

        public ClothesService(
            IClothesRepository clothesRepository,
            IBrandRepository brandRepository,
            EntityMapper entityMapper
        )
        {
            _clothesRepository = clothesRepository;
            _brandRepository = brandRepository;
            _entityMapper = entityMapper;
        }
        
        public async Task<List<ClothesDto>> GetAll()
        {
            var clothesList = await _clothesRepository.GetAll();
            var clothesDtoList = new HashSet<ClothesDto>();

            foreach (var clothes in clothesList)
            {
                var clothesDto = await GetClothesDto(clothes);
                clothesDtoList.Add(clothesDto);
            }

            return clothesDtoList.ToList();
        }

        public async Task<ClothesDto> GetById(int id)
        {
            var clothes = await _clothesRepository.GetById(id);
            var clothesDto = await GetClothesDto(clothes);
            return clothesDto;
        }

        public async Task<ClothesDto> Create(ClothesDto dto)
        {
            var clothes = _entityMapper.ToEntity<Clothes, ClothesDto>(dto);
            var createdClothes = await _clothesRepository.Create(clothes);
            return _entityMapper.ToDto<Clothes, ClothesDto>(createdClothes);
        }

        public async Task<ClothesDto> Update(int id, ClothesDto dto)
        {
            var clothes = _entityMapper.ToEntity<Clothes, ClothesDto>(dto);
            var createdClothes = await _clothesRepository.Update(id, clothes);
            return _entityMapper.ToDto<Clothes, ClothesDto>(createdClothes);
        }

        public Task<bool> Delete(int id)
        {
            return _clothesRepository.Delete(id);
        }

        private async Task<ClothesDto> GetClothesDto(Clothes clothes)
        {
            var brand = await _brandRepository.GetById(clothes.BrandId);
            
            var brandDto = _entityMapper.ToDto<Brand, BrandDto>(brand);
            
            var clothesDto = _entityMapper.ToDto<Clothes, ClothesDto>(clothes);
            
            clothesDto.Brand = brandDto;
            
            return clothesDto;
        }
    }
}