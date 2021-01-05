namespace Server.Common.Exception
{
    public class UserExists : System.Exception
    {
        public UserExists() : base("User with this login already exist") {}
    }
}