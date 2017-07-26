using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace SportsStore.Models {

    public static class IdentitySeedData {
        private const string adminUser = "admin";
        private const string adminPassword = "MySecret123$";
        private const string adminRole = "Administrator";

        public static async void SeedDatabase(IApplicationBuilder app) {
            (GetAppService<IdentityDataContext>(app)).Database.Migrate();

            UserManager<IdentityUser> userManager 
                = GetAppService<UserManager<IdentityUser>>(app);
            RoleManager<IdentityRole> roleManager 
                = GetAppService<RoleManager<IdentityRole>>(app);

            IdentityRole role = await roleManager.FindByNameAsync(adminRole);
            IdentityUser user = await userManager.FindByNameAsync(adminUser);

            if (role == null) {
                role = new IdentityRole(adminRole);
                IdentityResult result = await roleManager.CreateAsync(role);
                if (!result.Succeeded) {
                    throw new Exception("Cannot create role: " 
                        + result.Errors.FirstOrDefault());
                }
            }

            if (user == null) {
                user = new IdentityUser(adminUser);
                IdentityResult result 
                    = await userManager.CreateAsync(user, adminPassword);
                if (!result.Succeeded) {
                    throw new Exception("Cannot create user: " 
                        + result.Errors.FirstOrDefault());                    
                }
            }

            if (!await userManager.IsInRoleAsync(user, adminRole)) {
                IdentityResult result 
                    = await userManager.AddToRoleAsync(user, adminRole);
                if (!result.Succeeded) {
                    throw new Exception("Cannot add user to role: " 
                        + result.Errors.FirstOrDefault());
                }
            }
        }

        private static T GetAppService<T>(IApplicationBuilder app) {
            return app.ApplicationServices.GetRequiredService<T>();
        }
    }
}
