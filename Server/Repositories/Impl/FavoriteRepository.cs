using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Application;
using Server.Common.Exception;
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
                throw new FavoriteNotFound();
            }

            return favorite;
        }

        public Task<List<Favorite>> GetByIds(List<int> ids)
        {
            throw new NotImplementedException();
        }

        public async Task<Favorite> Create(Favorite favorite)
        {
            if (AlreadyCreated(favorite))
            {
                throw new FavoriteAlreadyExist();
            }
            
            await _context.Favorite.AddAsync(favorite);
            await _context.SaveChangesAsync();

            return favorite;
        }
        
        public async Task<Favorite> Update(int id, Favorite favorite)
        {
            var oldFavorite = await GetById(id);
            
            _context.Favorite.Update(oldFavorite);
            await _context.SaveChangesAsync();

            return favorite;
        }

        public async Task<Boolean> Delete(int id)
        {
            var favorite = await GetById(id);
            
            _context.Favorite.Remove(favorite);

            return await _context.SaveChangesAsync() > 0;;
        }

        public List<Favorite> GetByUserId(int userId)
        {
            return _context.Favorite.Where(favorite => favorite.UserId.Equals(userId)).ToList();
        }
        
        public List<Favorite> GetByClothesId(int clothesId)
        {
            return _context.Favorite.Where(favorite => favorite.ClothesId.Equals(clothesId)).ToList();
        }
        
        private bool AlreadyCreated(Favorite favorite)
        {
            var findedFavorite =
                _context.Favorite.FirstOrDefault(fav => fav.ClothesId == favorite.ClothesId && fav.UserId == favorite.UserId);
            
            return findedFavorite != null;
        }
    }
}