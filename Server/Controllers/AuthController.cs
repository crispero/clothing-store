using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        
        [Route("login")]
        [HttpPost]
        public async Task<ActionResult<AuthDto>> Login(LoginDto loginDto)
        {
            AuthDto authDto = await _authService.Login(loginDto);
            return authDto;
        }
        
        [Route("register")]
        [HttpPost]
        public async Task<ActionResult<AuthDto>> Register(RegisterDto registerDto)
        {
            AuthDto authDto = await _authService.Register(registerDto);
            return authDto;
        }
    }
}