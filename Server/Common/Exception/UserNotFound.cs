namespace Server.Common.Exception
{
    public class UserNotFound : System.Exception
    {
        public UserNotFound() : base("User not found") {}
    }
}