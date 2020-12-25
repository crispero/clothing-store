using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Server.Dto;

namespace Server.Common.Auth
{
    public class JwtTokenGenerator
    {
        private readonly IOptions<AuthOptions> _authOptions;

        public JwtTokenGenerator(IOptions<AuthOptions> authOptions)
        {
            _authOptions = authOptions;
        }

        public string GenerateJwtToken(UserDto user, string userType)
        {
            var authParams = _authOptions.Value;

            var securityKey = authParams.GetSuSymmetricSecurityKey();
            
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Login),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim("role", userType),
            };
            
            var token = new JwtSecurityToken(
                authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifetime),
                signingCredentials: credentials
            );
            
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}