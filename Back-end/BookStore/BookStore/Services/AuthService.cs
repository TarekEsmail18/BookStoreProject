using BookStore.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Services
{
    public class AuthService: IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationSettings _applicationSettings;
        public AuthService(UserManager<ApplicationUser> userManager,RoleManager<IdentityRole> roleManager, IOptions<ApplicationSettings> applicationSettings)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _applicationSettings = applicationSettings.Value;
        }

        public async Task<AuthModel> RegisterAsync(ApplicationUserModel model)
        {
            var user = new ApplicationUser()
            {
                UserName = model.UserName,
                FullName = model.FullName,
                Email = model.Email
            };

            var userWithSameEmail = await _userManager.FindByEmailAsync(model.Email);
            var userWithSameUserName = await _userManager.FindByNameAsync(model.UserName);
            if (userWithSameEmail is not null)
                return new AuthModel { Message = "Email is already registered!" };

            if (userWithSameUserName is not null)
                return new AuthModel { Message = "Username is already registered!" };

            var result = await _userManager.CreateAsync(user, model.Password);
            await _userManager.AddToRoleAsync(user, Authorization.default_role.ToString());
            var userLogin = new LoginModel
            {

                Email = model.Email,
                Password = model.Password
            };
            if (result.Succeeded)
            {
                var LoginResult = await Login(userLogin);


                return new AuthModel {
                    Email = user.Email,
                    IsAuthenticated = true,
                    Username = user.UserName,
                    Roles = LoginResult.Roles,
                    Token = LoginResult.Token
                };
            }
            return null;
        }


        public async Task<AuthModel> Login(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            var authModel = new AuthModel();
            if(user != null && await _userManager.CheckPasswordAsync(user,model.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                   {
                        new Claim("UserID", user.Id.ToString())
                   }),
                    Expires = DateTime.UtcNow.AddHours(5),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_applicationSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                authModel.Token = tokenHandler.WriteToken(securityToken);
                authModel.Roles = (List<string>)await _userManager.GetRolesAsync(user).ConfigureAwait(false);
                authModel.IsAuthenticated = true;
                return authModel;
            }
            else
            {
                authModel.Message = "UserName OR Password is Incorrect";
                return authModel;
            }
        }




    }
}
