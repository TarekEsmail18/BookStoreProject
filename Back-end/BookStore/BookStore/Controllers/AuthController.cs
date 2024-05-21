using BookStore.Models;
using BookStore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Controllers
{
    [Route("Auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthController(IAuthService authService,UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _authService = authService;
            _userManager = userManager;
            _roleManager = roleManager;
        }


        [HttpPost]
        [Route("Register")]

        public async Task<IActionResult> RegisterAsync([FromBody] ApplicationUserModel model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _authService.RegisterAsync(model);

            if(!result.IsAuthenticated)
            {
                return BadRequest(result.Message);
            }

            return Ok(result);
        }




        [HttpPost]
        [Route("Login")]

        public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
        {
            if(!ModelState.IsValid)
           
                return BadRequest(ModelState);
            
            
            var result = await _authService.Login(model);
            
            if(!result.IsAuthenticated)

                return BadRequest(result.Message);
            
            
            return Ok(result);

        }

        [HttpGet]
        [Route("userProfile")]
        [Authorize]
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var UserRoles = await _userManager.GetRolesAsync(user);
            return new
            {
                user.FullName,
                user.Email,
                user.UserName,
                user.Id,
                UserRoles
            };
        }

    }
}
