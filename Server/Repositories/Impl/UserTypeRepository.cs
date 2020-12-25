using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Application;
using Server.Models;

namespace Server.Repositories.Impl
{
    public class UserTypeRepository : IUserTypeRepository
    {
        private readonly ApplicationContext _context;
        
        public UserTypeRepository(ApplicationContext context)
        {
            _context = context;
        }
        
        public async Task<List<UserType>> GetAll()
        {
            return await _context.UserTypes.ToListAsync();
        }

        public async Task<UserType> GetById(int id)
        {
            var userTypes = await _context.UserTypes.FindAsync(id);
            
            return userTypes;
        }

        public Task<List<UserType>> GetByIds(List<int> ids)
        {
            throw new System.NotImplementedException();
        }

        public Task<UserType> Create(UserType entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<UserType> Update(int id, UserType entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}