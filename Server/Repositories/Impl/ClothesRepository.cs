using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Application;
using Server.Common.Exception;
using Server.Dto;
using Server.Models;

namespace Server.Repositories.Impl
{
    public class ClothesRepository : IClothesRepository
    {
        private readonly ApplicationContext _context;

        public ClothesRepository(ApplicationContext context)
        {
            _context = context;
        }
        
        public async Task<List<Clothes>> GetAll()
        {
            return await _context.Clothes.ToListAsync();
        }
        
        public async Task<Clothes> GetById(int id)
        {
            var clothes = await _context.Clothes.FindAsync(id);

            if (clothes == null)
            {
                throw new ClothesNotFound();
            }

            return clothes;
        }

        public async Task<List<Clothes>> GetByIds(List<int> ids)
        {
            var clothesList = new HashSet<Clothes>();

            foreach (var id in ids)
            {
                var clothes = await GetById(id);
                if (clothes != null)
                {
                    clothesList.Add(clothes);
                }
            }

            return clothesList.ToList();
        }

        public async Task<Clothes> Create(Clothes clothes)
        {
            await _context.Clothes.AddAsync(clothes);
            await _context.SaveChangesAsync();

            return clothes;
        }
        
        public async Task<Clothes> Update(int id, Clothes entity)
        {
            var clothes = await GetById(id);

            clothes.Name = entity.Name;
            clothes.BrandId = entity.BrandId;
            clothes.Description = entity.Description;
            clothes.Size = entity.Size;
            clothes.GenderType = entity.GenderType;
            clothes.Color = entity.Color;
            clothes.IsOrdered = entity.IsOrdered;
            clothes.PictureUrl = entity.PictureUrl;
            clothes.Price = entity.Price;

            _context.Clothes.Update(clothes);

            await _context.SaveChangesAsync();

            return clothes;
        }
        
        public async Task<bool> Delete(int id)
        {
            var clothes = await GetById(id);

            _context.Clothes.Remove(clothes);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Clothes>> GetClothesWithFilters(ClothesFilterDto options)
        {
            var clothesList = await GetAll();
            var name = options.Name;
            var genderType = options.GenderType;
            var size = options.Size;
            var isOrdered = options.IsOrdered;

            if (!string.IsNullOrEmpty(name))
            {
                clothesList = clothesList.Where(clothes => clothes.Name.ToLower().Contains(name)).ToList();
            }

            if (genderType != 0)
            {
                clothesList = clothesList.Where(clothes => clothes.GenderType.Equals(genderType)).ToList();
            }

            if (size != 0)
            {
                clothesList = clothesList.Where(clothes => clothes.Size.Equals(size)).ToList();
            }

            return clothesList.Where(clothes => clothes.IsOrdered.Equals(isOrdered)).ToList();
        }
    }
}