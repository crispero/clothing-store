using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Application;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public BasketController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Basket
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Basket>>> GetBasket()
        {
            return await _context.Basket.ToListAsync();
        }

        // GET: api/Basket/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Basket>> GetBasket(int id)
        {
            var basket = await _context.Basket.FindAsync(id);

            if (basket == null)
            {
                return NotFound();
            }

            return basket;
        }

        // PUT: api/Basket/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBasket(int id, Basket basket)
        {
            if (id != basket.BasketId)
            {
                return BadRequest();
            }

            _context.Entry(basket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BasketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Basket
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Basket>> PostBasket(Basket basket)
        {
            _context.Basket.Add(basket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBasket", new { id = basket.BasketId }, basket);
        }

        // DELETE: api/Basket/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Basket>> DeleteBasket(int id)
        {
            var basket = await _context.Basket.FindAsync(id);
            if (basket == null)
            {
                return NotFound();
            }

            _context.Basket.Remove(basket);
            await _context.SaveChangesAsync();

            return basket;
        }

        private bool BasketExists(int id)
        {
            return _context.Basket.Any(e => e.BasketId == id);
        }
    }
}
