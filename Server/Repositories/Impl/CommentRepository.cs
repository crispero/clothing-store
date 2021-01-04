using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Application;
using Server.Common.Exception;
using Server.Models;

namespace Server.Repositories.Impl
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationContext _context;

        public CommentRepository(ApplicationContext context)
        {
            _context = context;
        }
        
        public async Task<List<Comment>> GetAll()
        {
            return await _context.Comment.ToListAsync();
        }
        
        public async Task<Comment> GetById(int id)
        {
            var comment = await _context.Comment.FindAsync(id);

            if (comment == null)
            {
                throw new CommentNotFound();
            }

            return comment;
        }

        public Task<List<Comment>> GetByIds(List<int> ids)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Comment> Update(int id, Comment entity)
        {
            var comment = await GetById(id);

            comment.Text = entity.Text;

            _context.Comment.Update(comment);

            await _context.SaveChangesAsync();

            return comment;
        }
        
        public async Task<Comment> Create(Comment comment)
        {
            await _context.Comment.AddAsync(comment);
            await _context.SaveChangesAsync();

            return comment;
        }
        
        public async Task<bool> Delete(int id)
        {
            var comment = await GetById(id);

            _context.Comment.Remove(comment);
            await _context.SaveChangesAsync();

            return true;
        }

        public List<Comment> GetByClothesId(int clothesId)
        {
            return _context.Comment.Where(comment => comment.ClothesId.Equals(clothesId)).ToList();
        }

        private bool CommentExists(int id)
        {
            return _context.Comment.Any(e => e.CommentId == id);
        }
    }
}