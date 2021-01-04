namespace Server.Common.Exception
{
    public class CommentNotFound : System.Exception
    {
        public CommentNotFound() : base("Comment not found") {}
    }
}