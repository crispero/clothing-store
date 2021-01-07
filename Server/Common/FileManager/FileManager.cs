using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Server.Common.FileManager
{
    public class FileManager : IFileManager
    {
        private readonly string _imagesPath;

        public FileManager(IConfiguration configuration)
        {
            _imagesPath = configuration["Paths:Images"];
        }
        
        public FileStreamResult GetImageStreamResult(string fileName)
        {
            var filePath = Path.Combine(_imagesPath, fileName);

            if (!IsFileExists(filePath))
            {
                throw new FileNotFoundException();
            }

            var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            var extension = Path.GetExtension(fileStream.Name);

            return new FileStreamResult(fileStream, $"image/{extension.Substring(1)}");
        }
        
        public async Task<string> UploadFile(IFormFile image)
        {
            if (!Directory.Exists(_imagesPath))
            {
                Directory.CreateDirectory(_imagesPath);
            }

            var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
            var filePath = Path.Combine(_imagesPath, fileName);

            await using var fileStream = new FileStream(filePath, FileMode.Create);
            await image.CopyToAsync(fileStream);

            return fileName;
        }
        
        public void DeleteFile(string fileName)
        {
            var filePath = Path.Combine(_imagesPath, fileName);

            if (!IsFileExists(filePath))
            {
                throw new FileNotFoundException();
            }

            File.Delete(filePath);
        }

        private static bool IsFileExists(string filePath)
        {
            return File.Exists(filePath);
        }
    }
}