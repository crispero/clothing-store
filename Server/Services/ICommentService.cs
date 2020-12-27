using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Dto;

namespace Server.Services
{
    public interface ICommentService : IService<CommentDto>
    {
        List<CommentDto> GetByClothesId(int clothesId);
    }
}