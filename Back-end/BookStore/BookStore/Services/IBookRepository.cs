using BookStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace BookStore.Services
{
    public interface IBookRepository
    {
        IEnumerable<BookAuthorModel> Get();
        BookAuthorModel GetById(int Id);
        HttpResponseMessage DeleteBookById(int id);
        string AddBook(Book book);
        string Edit(int id, Book book);
        IEnumerable<BookAuthorModel> GetByCat(string Cat);
        int CountOfBook(int NumberOfBookShowBerPage);
        IEnumerable<BookAuthorModel> GetBookOfPages(pageParam pageParam);
    }
}
