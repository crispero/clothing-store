using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Common.Exception;
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
            try
            {
                AuthDto authDto = await _authService.Login(loginDto);
                return authDto;
            }
            catch (UserNotFound e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
        
        [Route("register")]
        [HttpPost]
        public async Task<ActionResult<AuthDto>> Register(RegisterDto registerDto)
        {
            try
            {
                AuthDto authDto = await _authService.Register(registerDto);
                return authDto;
            }
            catch (UserExists e)
            {
                return BadRequest(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
    }
}