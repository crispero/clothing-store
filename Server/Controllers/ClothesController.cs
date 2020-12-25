using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClothesController : ControllerBase
    {
        private readonly IClothesService _clothesService;

        public ClothesController(IClothesService clothesService)
        {
            _clothesService = clothesService;
        }

        // GET: api/Clothes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClothesDto>>> GetClothes()
        {
            return await _clothesService.GetAll();
        }
        
        [HttpGet("ids")]
        public async Task<ActionResult<IEnumerable<ClothesDto>>> GetClothesByIds([FromQuery]int[] ids)
        {
            return await _clothesService.GetByIds(ids.ToList());
        }

        // GET: api/Clothes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClothesDto>> GetClothes(int id)
        {
            return await _clothesService.GetById(id);
        }

        // PUT: api/Clothes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<ActionResult<ClothesDto>> PutClothes(int id, ClothesDto clothes)
        {
            return await _clothesService.Update(id, clothes);
        }

        // POST: api/Clothes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ClothesDto>> PostClothes(ClothesDto clothes)
        {
            return await _clothesService.Create(clothes);
        }

        // DELETE: api/Clothes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteClothes(int id)
        {
            return await _clothesService.Delete(id);
        }
    }
}
