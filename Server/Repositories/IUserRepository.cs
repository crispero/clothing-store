using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Server.DTO;
using Server.Models;

namespace Server.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetUserByLogin(string login);

        Task<User> Register(RegisterDto registerDto);

        public PasswordVerificationResult VerifyHashedPassword(User user, string password);
    }
}