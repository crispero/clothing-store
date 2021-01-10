using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Application;
using Server.Common.Exception;
using Server.Models;

namespace Server.Repositories.Impl
{
    public class BrandRepository : IBrandRepository
    {
        private readonly ApplicationContext _context;

        public BrandRepository(ApplicationContext context)
        {
            _context = context;
        }
        
        public async Task<List<Brand>> GetAll()
        {
            return await _context.Brand.ToListAsync();
        }
        
        public async Task<Brand> GetById(int id)
        {
            var brand = await _context.Brand.FindAsync(id);

            if (brand == null)
            {
                throw new BrandNotFound();
            }

            return brand;
        }

        public Task<List<Brand>> GetByIds(List<int> ids)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Brand> Update(int id, Brand entity)
        {
            var brand = await GetById(id);

            brand.Name = entity.Name;
            brand.Description = entity.Description;
            brand.LogoUrl = entity.LogoUrl;

            _context.Brand.Update(brand);

            await _context.SaveChangesAsync();
            return brand;
        }
        
        public async Task<Brand> Create(Brand brand)
        {
            await _context.Brand.AddAsync(brand);
            await _context.SaveChangesAsync();

            return brand;
        }
        public async Task<bool> Delete(int id)
        {
            var brand = await GetById(id);

            _context.Brand.Remove(brand);

            return await _context.SaveChangesAsync() > 0;;
        }
    }
}