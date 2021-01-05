using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Repositories
{
    public interface IFavoriteRepository : IRepository<Favorite>
    {
        List<Favorite> GetByUserId(int userId);
    }
}