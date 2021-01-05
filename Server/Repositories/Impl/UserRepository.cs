using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Application;
using Server.Common.Exception;
using Server.DTO;
using Server.Models;

namespace Server.Repositories.Impl
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        
        public UserRepository(ApplicationContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }
        
        public async Task<List<User>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetById(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                throw new UserNotFound();
            }
            
            return user;
        }

        public Task<List<User>> GetByIds(List<int> ids)
        {
            throw new NotImplementedException();
        }

        public Task<User> Create(User entity)
        {
            throw new System.NotImplementedException();
        }

        public async Task<User> Update(int id, User user)
        {
            var oldUser = await GetById(id);
            
            if (!IsEquals(oldUser.Login, user.Login) && IsUserExists(user.Login))
            {
                throw new UserExists();
            }
            
            oldUser.UserTypeId = user.UserTypeId;
            oldUser.Login = user.Login;

            if (user.Password != null)
            {
                oldUser.Password = IsEquals(user.Password, user.Password)
                    ? user.Password
                    : HashPassword(user, user.Password);
            }
            
            oldUser.Name = user.Name;
            oldUser.Surname = user.Surname;
            oldUser.PictureUrl = user.PictureUrl;
            oldUser.GenderType = user.GenderType;
            oldUser.Address = user.Address;

            _context.Users.Update(oldUser);
            
            await _context.SaveChangesAsync();

            return oldUser;
        }

        public async Task<bool> Delete(int id)
        {
            var user = await GetById(id);

            _context.Users.Remove(user);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<User> GetUserByLogin(string login)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Login == login);
        }

        public async Task<User> Register(RegisterDto registerDto)
        {
            var userType = await _context.UserTypes.FirstOrDefaultAsync(type => type.Name == "User");

            var user = new User
            {
                Login = registerDto.Login,
                Name = registerDto.Name,
                Surname = registerDto.Surname,
                UserTypeId = userType.UserTypeId
            };

            user.Password = HashPassword(user, registerDto.Password);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            
            return user;
        }

        public PasswordVerificationResult VerifyHashedPassword(User user, string password)
        {
            return _passwordHasher.VerifyHashedPassword(user, user.Password, password);
        }
        
        private string HashPassword(User user, string password)
        {
            return _passwordHasher.HashPassword(user, password);
        }
        
        private bool IsUserExists(string login)
        {
            return _context.Users.Any(e => e.Login == login);
        }
        
        private static bool IsEquals(string lhs, string rhs)
        {
            return lhs.Equals(rhs);
        }
    }
}