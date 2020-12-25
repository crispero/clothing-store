using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        // GET: api/Comment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetComment()
        {
            return await _commentService.GetAll();
        }

        // GET: api/Comment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommentDto>> GetComment(int id)
        {
            return await _commentService.GetById(id);
        }

        // PUT: api/Comment/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<ActionResult<CommentDto>> PutComment(int id, CommentDto commentDto)
        {
            return await _commentService.Update(id, commentDto);
        }

        // POST: api/Comment
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CommentDto>> PostComment(CommentDto commentDto)
        {
            return await _commentService.Create(commentDto);
        }

        // DELETE: api/Comment/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteComment(int id)
        {
            return await _commentService.Delete(id);
        }
    }
}
