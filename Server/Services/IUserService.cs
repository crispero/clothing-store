using System.Threading.Tasks;
using Server.Dto;
using Server.DTO;
using Server.Models;

namespace Server.Services
{
    public interface IUserService : IService<UserDto>
    {
        Task<UserDto> Login(LoginDto loginDto);

        Task<UserDto> Register(RegisterDto registerDto);
    }
}