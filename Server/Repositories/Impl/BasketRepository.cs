using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Application;
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
                
            }
            
            await _context.Basket.AddAsync(basket);
            await _context.SaveChangesAsync();

            return basket;
        }
        
        public async Task<Basket> Update(int id, Basket basket)
        {
            if (id != basket.BasketId)
            {
                
            }

            _context.Entry(basket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BasketExists(id))
                {
                    
                }
                else
                {
                    throw;
                }
            }

            return basket;
        }

        public async Task<Boolean> Delete(int id)
        {
            var basket = await _context.Basket.FindAsync(id);
            if (basket == null)
            {
                
            }

            _context.Basket.Remove(basket);

            return await _context.SaveChangesAsync() > 0;;
        }

        public List<Basket> GetByUserId(int userId)
        {
            return _context.Basket.Where(basket => basket.UserId.Equals(userId)).ToList();
        }

        private bool BasketExists(int id)
        {
            return _context.Basket.Any(e => e.BasketId == id);
        }

        private bool AlreadyCreated(Basket basket)
        {
            var findedBasket =
                _context.Basket.Where(bas => bas.ClothesId == basket.ClothesId && bas.UserId == basket.UserId);
            
            if (findedBasket != null)
            {
                return false;
            }

            return true;
        }
    }
}