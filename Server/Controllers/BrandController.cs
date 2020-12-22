using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;

        public BrandController(IBrandService brandService)
        {
            _brandService = brandService;
        }

        // GET: api/Brand
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Brand>>> GetBrand()
        {
            return await _brandService.GetAll();
        }

        // GET: api/Brand/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrand(int id)
        {
            return await _brandService.GetById(id);
        }

        // PUT: api/Brand/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<ActionResult<Brand>> PutBrand(int id, Brand brand)
        {
            return await _brandService.Update(id, brand);
        }

        // POST: api/Brand
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Brand>> PostBrand(Brand brand)
        {
            return await _brandService.Create(brand);
        }

        // DELETE: api/Brand/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteBrand(int id)
        {
            return await _brandService.Delete(id);
        }
    }
}
