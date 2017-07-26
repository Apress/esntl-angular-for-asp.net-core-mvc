using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.SpaServices.Webpack;
using SportsStore.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using System.Linq;

namespace SportsStore {
    public class Startup {
        public Startup(IHostingEnvironment env) {
            var builder = new ConfigurationBuilder()
              .SetBasePath(env.ContentRootPath)
              .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
              .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
              .AddEnvironmentVariables()
              .AddCommandLine(System.Environment.GetCommandLineArgs()
                 .Skip(1).ToArray());              
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        public void ConfigureServices(IServiceCollection services) {

            services.AddDbContext<IdentityDataContext>(options =>
                options.UseSqlServer(Configuration
                    ["Data:Identity:ConnectionString"]));

            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<IdentityDataContext>();

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
                options.CookieName = "SportsStore.Session";
                options.IdleTimeout = System.TimeSpan.FromHours(48);
                options.CookieHttpOnly = false;
            });

            services.Configure<IdentityOptions>(config => {
                config.Cookies.ApplicationCookie.Events = 
                    new CookieAuthenticationEvents {
                        OnRedirectToLogin = context => {
                            if (context.Request.Path.StartsWithSegments("/api") 
                                    && context.Response.StatusCode == 200) {
                                context.Response.StatusCode = 401;
                            } else {
                                context.Response.Redirect(context.RedirectUri);
                            }
                            return Task.FromResult<object>(null);
                        }
                    };
            });        

            services.AddAntiforgery(options => {
                options.HeaderName = "X-XSRF-TOKEN";
            });
                
        }

        public async void Configure(IApplicationBuilder app,
                IHostingEnvironment env, ILoggerFactory loggerFactory, 
                IAntiforgery antiforgery) {

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // app.UseDeveloperExceptionPage();
            // app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
            //     HotModuleReplacement = true
            // });

            app.UseStaticFiles();
            app.UseSession();
            app.UseIdentity();

            app.Use(nextDelegate => context => {
                if (context.Request.Path.StartsWithSegments("/api")
                        || context.Request.Path.StartsWithSegments("/")) {                     
                    context.Response.Cookies.Append("XSRF-TOKEN", 
                       antiforgery.GetAndStoreTokens(context).RequestToken);
                }
                return nextDelegate(context);
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
                SeedData.SeedDatabase(app.ApplicationServices
                    .GetRequiredService<DataContext>());
                await IdentitySeedData.SeedDatabase(app);
                System.Console.WriteLine("Database Preparation Complete");                
                System.Environment.Exit(0);
            }
              
        }
    }
}
