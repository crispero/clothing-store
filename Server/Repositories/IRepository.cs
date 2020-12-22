using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public interface IRepository<TEntity>
    {
        Task<List<TEntity>> GetAll();
        Task<TEntity> GetById(int id);
        Task<TEntity> Create(TEntity entity);
        Task<TEntity> Update(int id, TEntity entity);
        Task<bool> Delete(int id);
    }
}