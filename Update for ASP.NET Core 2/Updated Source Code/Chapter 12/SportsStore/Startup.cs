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
using Microsoft.AspNetCore.Antiforgery;

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

            services.AddAntiforgery(options => {
                options.HeaderName = "X-XSRF-TOKEN";
            });
        }

        public void Configure(IApplicationBuilder app, 
                IHostingEnvironment env, DataContext context, 
                IdentityDataContext identityContext,
                UserManager<IdentityUser> userManager,
                RoleManager<IdentityRole> roleManager,
                IAntiforgery antiforgery) {

            //app.UseDeveloperExceptionPage();
            //app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
            //    HotModuleReplacement = true
            //});

            app.UseStaticFiles();
            app.UseSession();
            app.UseAuthentication();

            app.Use(nextDelegate => requestContext => {
                if (requestContext.Request.Path.StartsWithSegments("/api")
                        || requestContext.Request.Path.StartsWithSegments("/")) {                     
                    requestContext.Response.Cookies.Append("XSRF-TOKEN", 
                       antiforgery.GetAndStoreTokens(requestContext).RequestToken);
                }
                return nextDelegate(requestContext);
            });

            app.UseMvc(routes => {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute("angular-fallback", 
                    new { controller = "Home", action = "Index" });
            });

            if ((Configuration["INITDB"] ?? "false") == "true") {
                System.Console.WriteLine("Preparing Database...");
                context.Database.Migrate();
                SeedData.SeedDatabase(context);
                identityContext.Database.Migrate();
                IdentitySeedData.SeedDatabase(identityContext, 
                    userManager, roleManager).GetAwaiter().GetResult();
                System.Console.WriteLine("Database Preparation Complete");                
                System.Environment.Exit(0);
            }
        }
    }
}
