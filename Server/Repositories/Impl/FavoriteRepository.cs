using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Application;
using Server.Models;

namespace Server.Repositories.Impl
{
    public class FavoriteRepository : IFavoriteRepository
    {
        private readonly ApplicationContext _context;

        public FavoriteRepository(ApplicationContext context)
        {
            _context = context;
        }
        
        public async Task<List<Favorite>> GetAll()
        {
            return await _context.Favorite.ToListAsync();
        }
        
        public async Task<Favorite> GetById(int id)
        {
            var favorite = await _context.Favorite.FindAsync(id);

            if (favorite == null)
            {
                
            }

            return favorite;
        }

        public async Task<Favorite> Create(Favorite favorite)
        {
            _context.Favorite.Add(favorite);
            await _context.SaveChangesAsync();

            return favorite;
        }
        
        public async Task<Favorite> Update(int id, Favorite favorite)
        {
            if (id != favorite.FavoriteId)
            {
                
            }

            _context.Entry(favorite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavoriteExists(id))
                {
                    
                }
                else
                {
                    throw;
                }
            }

            return favorite;
        }

        public async Task<Boolean> Delete(int id)
        {
            var favorite = await _context.Favorite.FindAsync(id);
            if (favorite == null)
            {
                
            }

            _context.Favorite.Remove(favorite);
            await _context.SaveChangesAsync();

            return true;
        }
        
        private bool FavoriteExists(int id)
        {
            return _context.Favorite.Any(e => e.FavoriteId == id);
        }
    }
}