using System.Threading.Tasks;
using Server.Models;
using Server.Repositories;

namespace Server.Services.Impl
{
    public class UserTypeService : IUserTypeService
    {
        private readonly IUserTypeRepository _userTypeRepository;

        public UserTypeService(IUserTypeRepository userTypeRepository)
        {
            _userTypeRepository = userTypeRepository;
        }
        
        public async Task<UserType> GetUserTypeById(int id)
        {
            return await _userTypeRepository.GetById(id);
        }
    }
}