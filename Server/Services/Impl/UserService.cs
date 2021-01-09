using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Server.Common.Exception;
using Server.Dto;
using Server.DTO;
using Server.Models;
using Server.Repositories;

namespace Server.Services.Impl
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _entityMapper;

        public UserService(IUserRepository userRepository, IMapper entityMapper)
        {
            _userRepository = userRepository;
            _entityMapper = entityMapper;
        }
        
        public async Task<List<UserDto>> GetAll()
        {
            var users = await _userRepository.GetAll();
            return GetUserDtoList(users);
        }

        public async Task<UserDto> GetById(int id)
        {
            var user = await _userRepository.GetById(id);
            return GetUserDto(user);
        }

        public Task<List<UserDto>> GetByIds(List<int> ids)
        {
            throw new System.NotImplementedException();
        }

        public async Task<UserDto> Create(UserDto userDto)
        {
            var user = _entityMapper.Map<User>(userDto);
            var createdUser = await _userRepository.Create(user);
            return GetUserDto(createdUser);
        }

        public async Task<UserDto> Update(int id, UserDto userDto)
        {
            var user = _entityMapper.Map<User>(userDto);
            var createdUser = await _userRepository.Update(id, user);
            return GetUserDto(createdUser);
        }

        public Task<bool> Delete(int id)
        {
            return _userRepository.Delete(id);
        }
        
        public async Task<UserDto> Login(LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByLogin(loginDto.Login);

            if (user == null)
            {
                throw new UserNotFound();
            }
            
            var verifyHashedPassword = _userRepository.VerifyHashedPassword(user, loginDto.Password);
            if (verifyHashedPassword == PasswordVerificationResult.Failed)
            {
                throw new InvalidCredentialException("Invalid password");
            }
            
            return GetUserDto(user);
        }

        public async Task<UserDto> Register(RegisterDto registerDto)
        {
            var user = await _userRepository.Register(registerDto);
            return GetUserDto(user);
        }
        
        private UserDto GetUserDto(User user)
        {
            return _entityMapper.Map<UserDto>(user);
        }

        private List<UserDto> GetUserDtoList(List<User> users)
        {
            return users.Select(GetUserDto).ToList();
        }
    }
}