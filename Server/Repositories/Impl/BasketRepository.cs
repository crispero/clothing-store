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

        public async Task<Basket> Create(Basket basket)
        {
            _context.Basket.Add(basket);
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
            await _context.SaveChangesAsync();

            return true;
        }
        
        private bool BasketExists(int id)
        {
            return _context.Basket.Any(e => e.BasketId == id);
        }
    }
}