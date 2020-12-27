using System.Collections.Generic;
using Server.Models;

namespace Server.Repositories
{
    public interface ICommentRepository : IRepository<Comment>
    {
        List<Comment> GetByClothesId(int clothesId);
    }
}