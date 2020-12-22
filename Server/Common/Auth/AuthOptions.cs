using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Server.Common.Auth
{
    public class AuthOptions
    {
        public string Issuer { get; set; }
        
        public string Audience { get; set; }
        
        public string Secret { get; set; }
        
        public int TokenLifetime { get; set; }

        public SymmetricSecurityKey GetSuSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Secret));
        }
    }
}