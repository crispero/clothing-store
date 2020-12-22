using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface IService<TDto>
    {
        Task<List<TDto>> GetAll();
        Task<TDto> GetById(int id);
        Task<TDto> Create(TDto entity);
        Task<TDto> Update(int id, TDto entity);
        Task<bool> Delete(int id);
    }
    
}