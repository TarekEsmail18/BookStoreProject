using BookStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Services
{
    public interface IAuthService
    {
        Task<AuthModel> RegisterAsync(ApplicationUserModel model);
        Task<AuthModel> Login(LoginModel model);
    }
}
