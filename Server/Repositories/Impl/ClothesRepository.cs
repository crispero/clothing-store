using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Application;
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
        
        public async Task<Clothes> Update(int id, Clothes clothes)
        {
            if (id != clothes.ClothesId)
            {
                
            }

            _context.Entry(clothes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClothesExists(id))
                {
                    
                }
                else
                {
                    throw;
                }
            }

            return clothes;
        }
        
        public async Task<bool> Delete(int id)
        {
            var clothes = await _context.Clothes.FindAsync(id);
            if (clothes == null)
            {
                
            }

            _context.Clothes.Remove(clothes);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Clothes>> GetClothesWithFilters(ClothesFilterDto options)
        {
            var name = options.Name;
            var genderType = options.GenderType;

            if (!string.IsNullOrEmpty(name))
            {
                return _context.Clothes.Where(
                    clothes => clothes.Name.ToLower().Contains(name) && clothes.GenderType.Equals(genderType)).ToList();
            }

            return _context.Clothes.Where(clothes => clothes.GenderType.Equals(genderType)).ToList();
        }

        private bool ClothesExists(int id)
        {
            return _context.Clothes.Any(e => e.ClothesId == id);
        }
    }
}