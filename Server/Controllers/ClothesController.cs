using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Common.Exception;
using Server.Dto;
using Server.DTO;
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
        public async Task<ActionResult<IEnumerable<ClothesDto>>> GetClothesList()
        {
            try
            {
                return await _clothesService.GetAll();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
        
        [HttpGet("ids")]
        public async Task<ActionResult<IEnumerable<ClothesDto>>> GetClothesByIds([FromQuery]int[] ids)
        {
            try
            {
                return await _clothesService.GetByIds(ids.ToList());
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // GET: api/Clothes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClothesDto>> GetClothes(int id)
        {
            try
            {
                return await _clothesService.GetById(id);
            }
            catch (ClothesNotFound e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // PUT: api/Clothes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPatch("{id}")]
        public async Task<ActionResult<ClothesDto>> PatchClothes(int id, ClothesDto clothes)
        {
            try
            {
                return await _clothesService.Update(id, clothes);
            }
            catch (ClothesNotFound e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // POST: api/Clothes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ClothesDto>> PostClothes(ClothesDto clothes)
        {
            try
            {
                return await _clothesService.Create(clothes);
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

        [HttpPost("params")]
        public async Task<ActionResult<List<ClothesDto>>> GetClothesWithFilters(ClothesFilterDto options)
        {
            try
            {
                return await _clothesService.GetClothesWithFilters(options);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // DELETE: api/Clothes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteClothes(int id)
        {
            try
            {
                return await _clothesService.Delete(id);
            }
            catch (ClothesNotFound e)
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
