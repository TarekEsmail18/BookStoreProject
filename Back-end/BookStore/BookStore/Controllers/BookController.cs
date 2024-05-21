using BookStore.Models;
using BookStore.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Hosting;


namespace BookStore.Controllers
{
    [Route("Book")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository BookRepository;
        private readonly IWebHostEnvironment env;
        public BookController(IBookRepository bookRepo, IWebHostEnvironment _env)
        {
            this.BookRepository = bookRepo;
            env = _env;
        }

        [HttpGet]
        [Route("Get")]
        public IEnumerable<BookAuthorModel> Get()
        {   
            return BookRepository.Get();
        }

        [HttpGet("Id")]
        [Route("GetById")]

        public BookAuthorModel GetById(int Id)
        {
            return BookRepository.GetById(Id);
        }


        [HttpGet("Cat")]
        [Route("GetByCat")]

        public IEnumerable<BookAuthorModel> GetByCat(string Cat)
        {
            return BookRepository.GetByCat(Cat);
        }



        [HttpGet("NumberOfBookShowBerPage")]
        [Route("CountOfPage")]

        public int CountOfBook(int NumberOfBookShowBerPage)
        {
            return BookRepository.CountOfBook(NumberOfBookShowBerPage);
        }


        [HttpGet("pageParam")]
        [Route("BookOfPages")]

        public IEnumerable<BookAuthorModel> GetBookOfPages([FromQuery] pageParam pageParam)
        {
            return BookRepository.GetBookOfPages(pageParam);
        }








        [HttpDelete("id")]
        [Route("Delete")]

        public HttpResponseMessage DeleteBook(int id)
        {
            return BookRepository.DeleteBookById(id);
        }




        [HttpPost]
        [Route("Post")]

        public string Post(Book book)
        {
            return BookRepository.AddBook(book);
        }

        [HttpPut("id")]
        [Route("Put")]

        public string Put(int id,Book book)
        {
            return BookRepository.Edit(id, book);
        }






        [HttpPost]
        [Route("SaveFile")]

        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = env.ContentRootPath + "/Images/" + filename;

                using(var stream = new FileStream(physicalPath,FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);

            }
            catch(Exception)
            {
                return new JsonResult("unknown.jpg");
            }
        }








    }
}
