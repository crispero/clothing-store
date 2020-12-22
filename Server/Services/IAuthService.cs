using System.Threading.Tasks;
using Server.DTO;

namespace Server.Services
{
    public interface IAuthService
    {
        Task<AuthDto> Login(LoginDto loginDto);

        Task<AuthDto> Register(RegisterDto registerDto);
    }
}