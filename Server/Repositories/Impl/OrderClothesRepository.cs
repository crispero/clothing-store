using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Application;
using Server.Models;

namespace Server.Repositories.Impl
{
    public class OrderClothesRepository : IOrderClothesRepository
    {
        private readonly ApplicationContext _context;
        
        public OrderClothesRepository(ApplicationContext context)
        {
            _context = context;
        }
        public async Task<List<OrderXClothes>> GetAll()
        {
            return await _context.OrderXClothes.ToListAsync();
        }

        public async Task<OrderXClothes> GetById(int id)
        {
            var orderXClothes = await _context.OrderXClothes.FindAsync(id);

            if (orderXClothes == null)
            {
                
            }

            return orderXClothes;
        }

        public async Task<List<OrderXClothes>> GetByIds(List<int> ids)
        {
            var clothesList = new HashSet<OrderXClothes>();

            foreach (var id in ids)
            {
                var orderXClothes = await GetById(id);
                if (orderXClothes != null)
                {
                    clothesList.Add(orderXClothes);
                }
            }

            return clothesList.ToList();
        }

        public async Task<OrderXClothes> Create(OrderXClothes orderXClothes)
        {
            await _context.OrderXClothes.AddAsync(orderXClothes);
            await _context.SaveChangesAsync();

            return orderXClothes;
        }

        public Task<OrderXClothes> Update(int id, OrderXClothes entity)
        {
            throw new System.NotImplementedException();
        }

        public async Task<bool> Delete(int id)
        {
            var orderXClothes = await GetById(id);

            _context.OrderXClothes.Remove(orderXClothes);

            return await _context.SaveChangesAsync() > 0;
        }

        public List<OrderXClothes> GetByOrderId(int orderId)
        {
            return _context.OrderXClothes.Where(orderXClothes => orderXClothes.OrderId.Equals(orderId)).ToList();
        }
    }
}