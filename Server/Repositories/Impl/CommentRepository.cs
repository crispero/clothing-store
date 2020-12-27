using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Application;
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
                
            }

            return comment;
        }

        public Task<List<Comment>> GetByIds(List<int> ids)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Comment> Update(int id, Comment comment)
        {
            if (id != comment.CommentId)
            {
                
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    
                }
                else
                {
                    throw;
                }
            }

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
            var comment = await _context.Comment.FindAsync(id);
            if (comment == null)
            {
                
            }

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