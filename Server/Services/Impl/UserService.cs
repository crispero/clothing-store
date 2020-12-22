using System.Collections.Generic;
using System.Threading.Tasks;
using Server.DTO;
using Server.Models;
using Server.Repositories;

namespace Server.Services.Impl
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        public Task<List<User>> GetAll()
        {
            return _userRepository.GetAll();
        }

        public Task<User> GetById(int id)
        {
            return _userRepository.GetById(id);
        }

        public Task<User> Create(User entity)
        {
            return _userRepository.Create(entity);
        }

        public Task<User> Update(int id, User entity)
        {
            return _userRepository.Update(id, entity);
        }

        public Task<bool> Delete(int id)
        {
            return _userRepository.Delete(id);
        }
        
        public async Task<User> Login(LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByLogin(loginDto.Login);

            if (user == null)
            {
                
            }
            
            var verifyHashedPassword = _userRepository.VerifyHashedPassword(user, loginDto.Password);

            return user;
        }

        public Task<User> Register(RegisterDto registerDto)
        {
            return _userRepository.Register(registerDto);
        }
    }
}