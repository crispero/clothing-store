using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Server.DTO;
using Server.Models;
using Server.Repositories;

namespace Server.Services.Impl
{
    public class BrandService : IBrandService
    {
        private readonly IBrandRepository _brandRepository;
        private readonly IMapper _entityMapper;
        
        public BrandService(IBrandRepository brandRepository, IMapper entityMapper)
        {
            _brandRepository = brandRepository;
            _entityMapper = entityMapper;
        }
        
        public async Task<List<BrandDto>> GetAll()
        {
            var brands = await _brandRepository.GetAll();
            return GetBrandDtoList(brands);
        }

        public async Task<BrandDto> GetById(int id)
        {
            var brand = await _brandRepository.GetById(id);
            return GetBrandDto(brand);
        }

        public Task<List<BrandDto>> GetByIds(List<int> ids)
        {
            throw new System.NotImplementedException();
        }

        public async Task<BrandDto> Create(BrandDto entity)
        {
            var brand = _entityMapper.Map<Brand>(entity);
            var createdBrand = await _brandRepository.Create(brand);
            return GetBrandDto(createdBrand);
        }

        public async Task<BrandDto> Update(int id, BrandDto entity)
        {
            var brand = _entityMapper.Map<Brand>(entity);
            var updatedBrand = await _brandRepository.Update(id, brand);
            return GetBrandDto(updatedBrand);
        }

        public Task<bool> Delete(int id)
        {
            return _brandRepository.Delete(id);
        }
        
        private BrandDto GetBrandDto(Brand brand)
        {
            return _entityMapper.Map<BrandDto>(brand);
        }

        private List<BrandDto> GetBrandDtoList(List<Brand> brandList)
        {
            return brandList.Select(GetBrandDto).ToList();
        }
    }
}