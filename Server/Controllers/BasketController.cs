using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketService _basketService;

        public BasketController(IBasketService basketService)
        {
            _basketService = basketService;
        }

        // GET: api/Basket
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BasketDto>>> GetBasket()
        {
            return await _basketService.GetAll();
        }

        // GET: api/Basket/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BasketDto>> GetBasket(int id)
        {
            return await _basketService.GetById(id);
        }
        
        // GET: api/Basket/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<BasketDto>>> GetFavoriteByUserId(int userId)
        {
            return await _basketService.GetByUserId(userId);
        }

        // PUT: api/Basket/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPatch("{id}")]
        public async Task<ActionResult<BasketDto>> PatchBasket(int id, BasketDto basketDto)
        {
            return await _basketService.Update(id, basketDto);
        }

        // POST: api/Basket
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<BasketDto>> PostBasket(BasketDto basketDto)
        {
            return await _basketService.Create(basketDto);
        }

        // DELETE: api/Basket/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteBasket(int id)
        {
            return await _basketService.Delete(id);
        }
    }
}
