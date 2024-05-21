using BookStore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace BookStore.Services
{
    public class bookServices : IBookRepository
    {
        private readonly Context context;

        public bookServices(Context con)
        {
            context = con;
        }

        public IEnumerable<BookAuthorModel> Get()
        {
            return context.books.Select(book => new BookAuthorModel
            {
                ID = book.ID,
                Name = book.Name,
                Author = book.Author.Name,
                Categories = book.Categories,
                Price = book.Price,
                Image = "https://localhost:44383/Images/" + book.Image,
                AuthorId = book.AuthorId
            }).ToList();

        }

        public BookAuthorModel GetById(int Id)
        {
            return context.books.Where(x => x.ID == Id)
                                .Select(book => new BookAuthorModel
                                {
                                    ID = book.ID,
                                    Name = book.Name,
                                    Author = book.Author.Name,
                                    Categories = book.Categories,
                                    Price = book.Price,
                                    Image = "https://localhost:44383/Images/" + book.Image,
                                    AuthorId = book.AuthorId
                                })
                                .FirstOrDefault();
        }



        public IEnumerable<BookAuthorModel> GetByCat(string Cat)
        {
            return context.books
                                .Where(x => x.Categories == Cat)
                                .Select(book => new BookAuthorModel
                                {
                                    ID = book.ID,
                                    Name = book.Name,
                                    Author = book.Author.Name,
                                    Categories = book.Categories,
                                    Price = book.Price,
                                    Image = "https://localhost:44383/Images/" + book.Image,
                                    AuthorId = book.AuthorId
                                })
                                .ToList();
        }


        public int CountOfBook(int NumberOfBookShowBerPage)
        {
            double NumberOfBook = this.Get().Count();
            double totalPage = NumberOfBook / NumberOfBookShowBerPage;
            totalPage = Math.Ceiling(totalPage);
            int totalPageWithInt = Convert.ToInt32(totalPage);
            return totalPageWithInt;
        }




        public IEnumerable<BookAuthorModel> GetBookOfPages(pageParam pageParam)
        {
              return Get()
                    .OrderBy(b => b.Name)
                    .Skip((pageParam.PageNumber) * pageParam.PageSize)
                    .Take(pageParam.PageSize)
                    .ToList();
        }



        public HttpResponseMessage DeleteBookById(int id)
        {
            Book book = context.books.Where(x => x.ID == id).FirstOrDefault();
            if(book == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            context.books.Remove(book);
            context.SaveChanges();
            var response = new HttpResponseMessage();
            response.Headers.Add("DeleteMessage", "Successfully Deleted!");
            return response;

        }


        public string AddBook(Book book)
        {
            if(book == null)
            {
                return "InValid";
            }

            context.Add(book);
            context.SaveChanges();
            return "Done!";
        }



        public string Edit(int id,Book book)
        {
            var UpdatedBook = context.books.Where(x => x.ID == id).FirstOrDefault();
            //var UpdatedBook = GetById(id);
            if (UpdatedBook != null)
            {
                UpdatedBook.Name = book.Name;
                UpdatedBook.Categories = book.Categories;
                UpdatedBook.Price = book.Price;
                UpdatedBook.Image = book.Image;
                UpdatedBook.AuthorId = book.AuthorId;
                context.SaveChanges();
            }
            else
            {
                return "Not Found!";
            }

            return "Updated!";

        }


    }
}
