using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models;
using Server.Repositories;

namespace Server.Services.Impl
{
    public class BrandService : IBrandService
    {
        private readonly IBrandRepository _brandRepository;

        public BrandService(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }
        
        public Task<List<Brand>> GetAll()
        {
            return _brandRepository.GetAll();
        }

        public Task<Brand> GetById(int id)
        {
            return _brandRepository.GetById(id);
        }

        public Task<Brand> Create(Brand entity)
        {
            return _brandRepository.Create(entity);
        }

        public Task<Brand> Update(int id, Brand entity)
        {
            return _brandRepository.Update(id, entity);
        }

        public Task<bool> Delete(int id)
        {
            return _brandRepository.Delete(id);
        }
    }
    
}