using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Server.Dto;
using Server.Models;
using Server.Repositories;

namespace Server.Services.Impl
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _entityMapper;

        public CommentService(ICommentRepository commentRepository, IMapper entityMapper)
        {
            _commentRepository = commentRepository;
            _entityMapper = entityMapper;
        }
        
        public async Task<List<CommentDto>> GetAll()
        {
            var comments = await _commentRepository.GetAll();
            
            var commentsDto = new HashSet<CommentDto>();

            foreach (var comment in comments)
            {
                var commentDto = _entityMapper.Map<CommentDto>(comment);
                commentsDto.Add(commentDto);
            }
            
            return commentsDto.ToList();
        }

        public async Task<CommentDto> GetById(int id)
        {
            var comment = await _commentRepository.GetById(id);
            
            return _entityMapper.Map<CommentDto>(comment);
        }

        public Task<List<CommentDto>> GetByIds(List<int> ids)
        {
            throw new System.NotImplementedException();
        }

        public async Task<CommentDto> Create(CommentDto commentDto)
        {
            var comment = _entityMapper.Map<Comment>(commentDto);

            var createdComment = await _commentRepository.Create(comment);

            return _entityMapper.Map<CommentDto>(createdComment);
        }

        public async Task<CommentDto> Update(int id, CommentDto commentDto)
        {
            var comment = _entityMapper.Map<Comment>(commentDto);

            var updatedComment = await _commentRepository.Update(id, comment);

            return _entityMapper.Map<CommentDto>(updatedComment);
        }

        public Task<bool> Delete(int id)
        {
            return _commentRepository.Delete(id);
        }
    }
}