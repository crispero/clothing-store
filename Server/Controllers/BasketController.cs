using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Common.Exception;
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
            try
            {
                return await _basketService.GetAll();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // GET: api/Basket/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BasketDto>> GetBasket(int id)
        {
            try
            {
                return await _basketService.GetById(id);
            }
            catch (BasketNotFound e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
        
        // GET: api/Basket/user/5
        [HttpGet("user/{userId}")]
        public ActionResult<List<BasketDto>> GetFavoriteByUserId(int userId)
        {
            try
            {
                return _basketService.GetByUserId(userId);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // PUT: api/Basket/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPatch("{id}")]
        public async Task<ActionResult<BasketDto>> PatchBasket(int id, BasketDto basketDto)
        {
            try
            {
                return await _basketService.Update(id, basketDto);
            }
            catch (BasketNotFound e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // POST: api/Basket
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<BasketDto>> PostBasket(BasketDto basketDto)
        {
            try
            {
                return await _basketService.Create(basketDto);
            }
            catch (InvalidDataException e)
            {
                return BadRequest(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // DELETE: api/Basket/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteBasket(int id)
        {
            try
            {
                return await _basketService.Delete(id);
            }
            catch (BasketNotFound e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
    }
}
