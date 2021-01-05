using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteService _favoriteService;

        public FavoriteController(IFavoriteService favoriteService)
        {
            _favoriteService = favoriteService;
        }

        // GET: api/Favorite
        public async Task<ActionResult<IEnumerable<FavoriteDto>>> GetFavorite()
        {
            return await _favoriteService.GetAll();
        }

        // GET: api/Favorite/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FavoriteDto>> GetFavorite(int id)
        {
            return await _favoriteService.GetById(id);
        }
        
        // GET: api/Favorite/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<FavoriteDto>>> GetFavoriteByUserId(int userId)
        {
            return await _favoriteService.GetByUserId(userId);
        }

        // PUT: api/Favorite/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPatch("{id}")]
        public async Task<ActionResult<FavoriteDto>> PatchFavorite(int id, FavoriteDto favoriteDto)
        {
            return await _favoriteService.Update(id, favoriteDto);
        }

        // POST: api/Favorite
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FavoriteDto>> PostFavorite(FavoriteDto favoriteDto)
        {
            return await _favoriteService.Create(favoriteDto);
        }

        // DELETE: api/Favorite/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteFavorite(int id)
        {
            return await _favoriteService.Delete(id);
        }
    }
}
