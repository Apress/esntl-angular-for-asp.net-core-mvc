using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.Webpack;
using SportsStore.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace SportsStore {

    public class Startup {

        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services) {

            services.AddDbContext<IdentityDataContext>(options =>
                options.UseSqlServer(Configuration
                    ["Data:Identity:ConnectionString"]));

            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<IdentityDataContext>()
                .AddDefaultTokenProviders();

            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(Configuration
                    ["Data:Products:ConnectionString"]));

            services.AddMvc().AddJsonOptions(opts => {
                opts.SerializerSettings.ReferenceLoopHandling   
                    = ReferenceLoopHandling.Serialize;
                opts.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            });

            services.AddDistributedSqlServerCache(options => {
                options.ConnectionString = 
                    Configuration["Data:Products:ConnectionString"];
                options.SchemaName = "dbo";
                options.TableName = "SessionData";
            });

            services.AddSession(options => {
                options.Cookie.Name = "SportsStore.Session";
                options.IdleTimeout = System.TimeSpan.FromHours(48);
                options.Cookie.HttpOnly = false;
            });

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options => {
                    options.Events.OnRedirectToLogin = context => {
                        if (context.Request.Path.StartsWithSegments("/api")
                                && context.Response.StatusCode == 200) {
                            context.Response.StatusCode = 401;
                        } else {
                            context.Response.Redirect(context.RedirectUri);
                        }
                        return Task.FromResult<object>(null);
                    };
                });            
        }

        public void Configure(IApplicationBuilder app, 
                IHostingEnvironment env, DataContext context, 
                IdentityDataContext identityContext,
                UserManager<IdentityUser> userManager,
                RoleManager<IdentityRole> roleManager) {

            app.UseDeveloperExceptionPage();
            app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                HotModuleReplacement = true
            });

            app.UseStaticFiles();
            app.UseSession();
            app.UseAuthentication();
            app.UseMvc(routes => {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute("angular-fallback", 
                    new { controller = "Home", action = "Index" });
            });


            SeedData.SeedDatabase(context);
            IdentitySeedData.SeedDatabase(identityContext, 
                userManager, roleManager).GetAwaiter().GetResult();
        }
    }
}
