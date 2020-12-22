using System.Threading.Tasks;
using Server.Models;

namespace Server.Services
{
    public interface IUserTypeService
    {
        Task<UserType> GetUserTypeById(int id);
    }
}