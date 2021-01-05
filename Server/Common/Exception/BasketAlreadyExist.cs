namespace Server.Common.Exception
{
    public class BasketAlreadyExist : System.Exception
    {
        public BasketAlreadyExist() : base("Basket already exist") {}
    }
}