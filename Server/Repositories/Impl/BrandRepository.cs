using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Application;
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
                
            }

            return brand;
        }
        
        public async Task<Brand> Update(int id, Brand brand)
        {
            if (id != brand.BrandId)
            {
                
            }

            _context.Entry(brand).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrandExists(id))
                {
                    
                }
                else
                {
                    throw;
                }
            }

            return brand;
        }
        
        public async Task<Brand> Create(Brand brand)
        {
            _context.Brand.Add(brand);
            await _context.SaveChangesAsync();

            return brand;
        }
        public async Task<bool> Delete(int id)
        {
            var brand = await _context.Brand.FindAsync(id);
            if (brand == null)
            {
                
            }

            _context.Brand.Remove(brand);
            await _context.SaveChangesAsync();

            return true;
        }

        private bool BrandExists(int id)
        {
            return _context.Brand.Any(e => e.BrandId == id);
        }
    }
}