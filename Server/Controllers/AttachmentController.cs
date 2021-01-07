using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Common.FileManager;
using Server.Dto;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttachmentController : Controller
    {
        private readonly IFileManager _fileManager;

        public AttachmentController(IFileManager fileManager)
        {
            _fileManager = fileManager;
        }
        
        [HttpGet("{fileName}")]
        public IActionResult GetImageStreamResult(string fileName)
        {
            try
            {
                return _fileManager.GetImageStreamResult(fileName);
            }
            catch (FileNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
        
        [Route("upload")]
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<FileDto>> UploadFile([FromForm] IFormFile file)
        {
            try
            {
                var path = await _fileManager.UploadFile(file);

                return new FileDto
                {
                    Path = path
                };
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
        
        [HttpPatch("{fileName}")]
        [Authorize]
        public async Task<ActionResult<FileDto>> UpdateFile(string fileName, [FromForm] IFormFile file)
        {
            try
            {
                _fileManager.DeleteFile(fileName);
                var path = await _fileManager.UploadFile(file);

                return new FileDto
                {
                    Path = path
                };
            }
            catch (FileNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
        
        [HttpDelete("{path}")]
        [Authorize]
        public ActionResult DeleteFile(string path)
        {
            try
            {
                _fileManager.DeleteFile(path);
                return NoContent();
            }
            catch (FileNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
    }
}