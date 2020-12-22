using System.Threading.Tasks;
using Server.Common.Auth;
using Server.DTO;

namespace Server.Services.Impl
{
    public class AuthService : IAuthService
    {
        private readonly JwtTokenGenerator _jwtTokenGenerator;
        private readonly IUserService _userService;
        private readonly IUserTypeService _userTypeService;
        
        public AuthService(
            JwtTokenGenerator jwtTokenGenerator,
            IUserService userService,
            IUserTypeService userTypeService
        )
        {
            _jwtTokenGenerator = jwtTokenGenerator;
            _userService = userService;
            _userTypeService = userTypeService;
        }
        
        public async Task<AuthDto> Login(LoginDto loginDto)
        {
            var user = await _userService.Login(loginDto);

            var userType = await _userTypeService.GetUserTypeById(user.UserTypeId);

            var token = _jwtTokenGenerator.GenerateJwtToken(user, userType.Name);

            return new AuthDto {AccessToken = token, UserId = user.UserId};
        }

        public async Task<AuthDto> Register(RegisterDto registerDto)
        {
            var user = await _userService.Register(registerDto);
            
            var userType = await _userTypeService.GetUserTypeById(user.UserTypeId);

            var token = _jwtTokenGenerator.GenerateJwtToken(user, userType.Name);

            return new AuthDto {AccessToken = token, UserId = user.UserId};
        }
    }
}