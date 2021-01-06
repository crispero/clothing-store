using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Application;
using Server.Common.Exception;
using Server.Models;

namespace Server.Repositories.Impl
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationContext _context;
        
        public OrderRepository(ApplicationContext context)
        {
            _context = context;
        }
        
        public async Task<List<Order>> GetAll()
        {
            return await _context.Order.ToListAsync();
        }

        public async Task<Order> GetById(int id)
        {
            var order = await _context.Order.FindAsync(id);

            if (order == null)
            {
                throw new OrderNotFound();
            }

            return order;
        }

        public Task<List<Order>> GetByIds(List<int> ids)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Order> Create(Order order)
        {
            await _context.Order.AddAsync(order);
            await _context.SaveChangesAsync();

            return order;
        }

        public async Task<Order> Update(int id, Order entity)
        {
            var order = await GetById(id);

            order.Status = entity.Status;
            _context.Order.Update(order);
            await _context.SaveChangesAsync();

            return order;
        }

        public async Task<bool> Delete(int id)
        {
            var order = await GetById(id);

            _context.Order.Remove(order);

            return await _context.SaveChangesAsync() > 0;
        }

        public List<Order> GetByUserId(int userId)
        {
            return _context.Order.Where(order => order.UserId.Equals(userId)).ToList();
        }
        
        private bool OrderExists(int id)
        {
            return _context.Order.Any(e => e.OrderId == id);
        }
    }
}