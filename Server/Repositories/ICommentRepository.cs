using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Repositories
{
    public interface ICommentRepository : IRepository<Comment>
    {
        Task<List<Comment>> GetByClothesId(int clothesId);
    }
}