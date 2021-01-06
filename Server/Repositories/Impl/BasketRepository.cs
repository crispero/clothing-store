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
    public class BasketRepository : IBasketRepository
    {
        private readonly ApplicationContext _context;

        public BasketRepository(ApplicationContext context)
        {
            _context = context;
        }
        
        public async Task<List<Basket>> GetAll()
        {
            return await _context.Basket.ToListAsync();
        }
        
        public async Task<Basket> GetById(int id)
        {
            var basket = await _context.Basket.FindAsync(id);

            if (basket == null)
            {
                throw new BasketNotFound();
            }

            return basket;
        }

        public Task<List<Basket>> GetByIds(List<int> ids)
        {
            throw new NotImplementedException();
        }

        public async Task<Basket> Create(Basket basket)
        {
            if (AlreadyCreated(basket))
            {
                throw new BasketAlreadyExist();
            }
            
            await _context.Basket.AddAsync(basket);
            await _context.SaveChangesAsync();

            return basket;
        }
        
        public async Task<Basket> Update(int id, Basket basket)
        {
            var oldBasket = await GetById(id);

            _context.Basket.Update(oldBasket);
            await _context.SaveChangesAsync();
            
            return oldBasket;
        }

        public async Task<Boolean> Delete(int id)
        {
            var basket = await GetById(id);

            _context.Basket.Remove(basket);

            return await _context.SaveChangesAsync() > 0;;
        }

        public List<Basket> GetByUserId(int userId)
        {
            return _context.Basket.Where(basket => basket.UserId.Equals(userId)).ToList();
        }
        
        public List<Basket> GetByClothesId(int clothesId)
        {
            return _context.Basket.Where(basket => basket.ClothesId.Equals(clothesId)).ToList();
        }

        private bool AlreadyCreated(Basket basket)
        {
            var findedBasket =
                _context.Basket.FirstOrDefault(bas => bas.ClothesId == basket.ClothesId && bas.UserId == basket.UserId);
            
            return findedBasket != null;
        }
    }
}