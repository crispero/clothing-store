namespace Server.Common.Exception
{
    public class FavoriteAlreadyExist : System.Exception
    {
        public FavoriteAlreadyExist() : base("Favorite already exist") {}
    }
}