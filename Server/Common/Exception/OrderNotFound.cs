namespace Server.Common.Exception
{
    public class OrderNotFound : System.Exception
    {
        public OrderNotFound() : base("Order not found") {}
    }
}