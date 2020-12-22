using System.Threading.Tasks;
using Server.DTO;
using Server.Models;

namespace Server.Services
{
    public interface IUserService : IService<User>
    {
        Task<User> Login(LoginDto loginDto);

        Task<User> Register(RegisterDto registerDto);
    }
}