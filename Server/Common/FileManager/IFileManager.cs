using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Common.FileManager
{
    public interface IFileManager
    {
        Task<string> UploadFile(IFormFile image);

        void DeleteFile(string fileName);

        FileStreamResult GetImageStreamResult(string fileName);
    }
}