# Update for Working with ASP.NET Core MVC 2

The release of version 2 of ASP.NET Core requires some changes in the way that projects are created and some of the essential APIs are consumed. This update provides replacement listings and source code for all of the chapters in the original edition of the book. I have provided a complete replacement for Chapter 3, which is the most affected by the new release. For other chapters, follow the original instructions but use the replacement listings specified below.

Adam Freeman (adam@adam-freeman.com)
London, September 2017

---

## Chapter 1

No changes are required for this chapter.

---

## Chapter 2

Follow the instructions in this chapte. Ensure that you have the latest version of Visual Studio 2017 or Visual Studio Code installed, as well as version 2.0 of the .NET Core SDK  from https://github.com/dotnet/core/blob/master/release-notes/download-archives/2.0.0-download.md

---

## Chapter 3

Use the replacement chapter included in this update. Ensure that you use the NPM and NuGet package versions specified in the listings.

---

## Chapter 4

The way that Entity Framework Core works has changed and requires a different approach to preparing the database. Use the following for Listing 4-8:

    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;
    using SportsStore.Models;

    namespace SportsStore {

        public class SeedData {

            public static void SeedDatabase(DataContext context) {
                if (context.Database.GetMigrations().Count() > 0
                        && context.Database.GetPendingMigrations().Count() == 0
                        && context.Products.Count() == 0) {
                    var s1 = new Supplier { Name = "Splash Dudes", 
                        City = "San Jose", State = "CA"};
                    var s2 = new Supplier { Name = "Soccer Town", 
                        City = "Chicago", State = "IL"};
                    var s3 = new Supplier { Name = "Chess Co", 
                        City = "New York", State = "NY"};

                    context.Products.AddRange(
                        new Product { Name = "Kayak", 
                            Description = "A boat for one person", 
                            Category = "Watersports", Price = 275, Supplier = s1, 
                            Ratings = new List<Rating> {
                                new Rating { Stars = 4 }, new Rating { Stars = 3 }}}, 
                        new Product { Name = "Lifejacket", 
                            Description = "Protective and fashionable", 
                            Category = "Watersports", Price = 48.95m , Supplier = s1, 
                            Ratings = new List<Rating> { 
                                new Rating { Stars = 2 }, new Rating { Stars = 5 }}},                          
                        new Product { 
                            Name = "Soccer Ball", 
                            Description = "FIFA-approved size and weight", 
                            Category = "Soccer", Price = 19.50m, Supplier = s2, 
                            Ratings = new List<Rating> { 
                                new Rating { Stars = 1 }, new Rating { Stars = 3 }}},                                                   
                        new Product { 
                            Name = "Corner Flags", 
                            Description = "Give your pitch a professional touch", 
                            Category = "Soccer", Price = 34.95m, Supplier = s2, 
                            Ratings = new List<Rating> { new Rating { Stars = 3 }}},                                                   
                        new Product { 
                            Name = "Stadium", 
                            Description = "Flat-packed 35,000-seat stadium", 
                            Category = "Soccer", Price = 79500, Supplier = s2,  
                            Ratings = new List<Rating> { new Rating { Stars = 1 }, 
                                new Rating { Stars = 4 }, new Rating { Stars = 3 }}},                                                                            
                        new Product { 
                            Name = "Thinking Cap", 
                            Description = "Improve brain efficiency by 75%", 
                            Category = "Chess", Price = 16, Supplier = s3, 
                            Ratings = new List<Rating> { new Rating { Stars = 5 }, 
                                new Rating { Stars = 4 }}},                                                                            
                        new Product { 
                            Name = "Unsteady Chair", 
                            Description = "Secretly give your opponent a disadvantage", 
                            Category = "Chess", Price = 29.95m, Supplier = s3,
                            Ratings = new List<Rating> { new Rating { Stars = 3 }}},                                                   
                        new Product { 
                            Name = "Human Chess Board", 
                            Description = "A fun game for the family", 
                            Category = "Chess", Price = 75, Supplier = s3 }, 
                        new Product { 
                            Name = "Bling-Bling King", 
                            Description = "Gold-plated, diamond-studded King", 
                            Category = "Chess", Price = 1200, Supplier = s3 }); 
                    context.SaveChanges();
                }
            }
        }
    }

Use the following for Listing 4-9:

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

    namespace SportsStore {
        public class Startup {
            public Startup(IConfiguration configuration) {
                Configuration = configuration;
            }

            public IConfiguration Configuration { get; }


            public void ConfigureServices(IServiceCollection services) {
                services.AddDbContext<DataContext>(options =>
                        options.UseSqlServer(Configuration
                            ["Data:Products:ConnectionString"]));
                services.AddMvc();
            }

            public void Configure(IApplicationBuilder app, 
                    IHostingEnvironment env, DataContext context) {

                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true
                });

                app.UseStaticFiles();

                app.UseMvc(routes => {
                    routes.MapRoute(
                        name: "default",
                        template: "{controller=Home}/{action=Index}/{id?}");
                });

                SeedData.SeedDatabase(context);
            }
        }
    }

Use the following for Listing 4-12:

    @section scripts {
        <script src="~/dist/inline.bundle.js" asp-append-version="true"></script>
        <script src="~/dist/polyfills.bundle.js" asp-append-version="true"></script>
        <script src="~/dist/vendor.bundle.js" asp-append-version="true"></script>
        <script src="~/dist/main.bundle.js" asp-append-version="true"></script>
    }

    <div class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">@(ViewBag.Message ?? "SPORTS STORE")</a>
    </div>

    <div id="data" class="p-1 bg-warning">
        @Json.Serialize(Model)
    </div>

    <div class="p-1 bg-info">
        <app-root></app-root>
    </div>

Before running the command in Listing 4-14, run this command to apply the migration to the database:

    dotnet ef database update

---

## Chapter 5

Before running the command in Listing 5-2, run this command to prepare the database:

    dotnet ef database update

Use the following for Listing 5-5:

    @section scripts {
        <script src="~/dist/inline.bundle.js" asp-append-version="true"></script>
        <script src="~/dist/polyfills.bundle.js" asp-append-version="true"></script>
        <script src="~/dist/vendor.bundle.js" asp-append-version="true"></script>
        <script src="~/dist/main.bundle.js" asp-append-version="true"></script>
    }

    <div class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">@(ViewBag.Message ?? "SPORTS STORE")</a>
    </div>

    @*<div id="data" class="p-1 bg-warning">*@
    @*  @Json.Serialize(Model)*@
    @*</div>*@

    <div class="p-1">
        <app-root></app-root>
    </div>

Use the following for Listing 5-12:

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

    namespace SportsStore {

        public class Startup {

            public Startup(IConfiguration configuration) {
                Configuration = configuration;
            }

            public IConfiguration Configuration { get; }


            public void ConfigureServices(IServiceCollection services) {
                services.AddDbContext<DataContext>(options =>
                        options.UseSqlServer(Configuration
                            ["Data:Products:ConnectionString"]));

                services.AddMvc().AddJsonOptions(opts =>
                    opts.SerializerSettings.ReferenceLoopHandling
                        = ReferenceLoopHandling.Serialize);
            }

            public void Configure(IApplicationBuilder app, 
                    IHostingEnvironment env, DataContext context) {

                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true
                });

                app.UseStaticFiles();

                app.UseMvc(routes => {
                    routes.MapRoute(
                        name: "default",
                        template: "{controller=Home}/{action=Index}/{id?}");
                });

                SeedData.SeedDatabase(context);

            }
        }
    }

---

## Chapter 6

Before running the command in Listing 6-2, run this command to prepare the database:

    dotnet ef database update

Use the following for Listing 6-11:

    using Microsoft.AspNetCore.Mvc;
    using SportsStore.Models;
    using SportsStore.Models.BindingTargets;
    using System.Collections.Generic;

    namespace SportsStore.Controllers {

        [Route("api/suppliers")]
        public class SupplierValuesController : Controller {
            private DataContext context;

            public SupplierValuesController(DataContext ctx) {
                context = ctx;
            }

            // ...other methods omitted for brevity...

            [HttpPut("{id}")]
            public IActionResult ReplaceSupplier(long id, 
                    [FromBody] SupplierData sdata) {
                if (ModelState.IsValid) {
                    Supplier s = sdata.Supplier;
                    s.SupplierId = id;
                    context.Update(s);
                    context.SaveChanges();
                    return Ok();
                } else {
                    return BadRequest(ModelState);
                }
            }

            private sendRequest(verb: RequestMethod, url: string, data?: any)
                : Observable<any> {

                return this.http.request(new Request({
                    method: verb, url: url, body: data
                })).map(response => {
                    try { return response.json();
                    } catch (e) { return null; }
                });
            }
        }
    }

After running the command in Listing 6-21, run this command to apply the migration to the database:

    dotnet ef database update

---

## Chapter 7

Before running the command in Listing 7-2, run this command to prepare the database:

    dotnet ef database update

---

## Chapter 8

Before running the command in Listing 8-2, run this command to prepare the database:

    dotnet ef database update

Use the following for Listing 8-14:

    <div class="row bg-dark">
        <div class="col">
                <div class="navbar navbar-dark">
                    <a class="navbar-brand text-white">
                        SPORTS STORE
                    </a>
                </div>
        </div>
        <div class="col-3 text-white mr-1 text-right">
            <store-cartsummary></store-cartsummary>
        </div>
    </div>    
    <div class="row no-gutters">
        <div class="col-3">
            <store-categoryfilter></store-categoryfilter>
        </div>
        <div class="col">
            <store-product-list></store-product-list>
            <store-pagination></store-pagination>
        </div>
    </div>

---

## Chapter 9

Before running the command in Listing 9-2, run this command to prepare the database:

    dotnet ef database update

Use the following for Listing 9-9:

    <div class="navbar bg-dark">
        <a class="navbar-brand text-white">SPORTS STORE</a>
    </div>

    <div class="m-1">
        <h2 class="text-center">Your Cart</h2>
        <table class="table table-bordered table-striped p-1">
            <thead>
                <tr>
                    <th>Quantity</th>
                    <th>Product</th>
                    <th class="text-right">Price</th>
                    <th class="text-right">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngIf="cart.selections.length == 0">
                    <td colspan="4" class="text-xs-center">
                        Your cart is empty
                    </td>
                </tr>
                <tr *ngFor="let sel of cart.selections">
                    <td>
                        <input type="number" class="form-control-sm"
                            style="width:5em" [(ngModel)]="sel.quantity" />
                    </td>
                    <td>{{sel.name}}</td>
                    <td class="text-right">
                        {{sel.price | currency:"USD":true:"2.2-2"}}
                    </td>
                    <td class="text-right">
                        {{(sel.quantity * sel.price) | currency:"USD":true:"2.2-2" }}
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-danger"
                                (click)="cart.updateQuantity(sel.productId, 0)">
                            Remove
                        </button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" class="text-right">Total:</td>
                    <td class="text-right">
                        {{cart.totalPrice | currency:"USD":true:"2.2-2"}}
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
    <div class="text-center">
        <button class="btn btn-primary" routerLink="/store">Continue Shopping</button>
        <button class="btn btn-secondary" routerLink="/checkout"
                [disabled]="cart.selections.length == 0">
            Checkout
        </button>
    </div>

Use the following for Listing 9-13:

    <Project Sdk="Microsoft.NET.Sdk.Web">
    <PropertyGroup>
        <TargetFramework>netcoreapp2.0</TargetFramework>
        <TypeScriptToolsVersion>2.3</TypeScriptToolsVersion>
    </PropertyGroup>
    <ItemGroup>
        <None Remove="ClientApp\app\models\cart.model.ts" />
        <None Remove="ClientApp\app\store\cartDetail.component.ts" />
        <None Remove="ClientApp\boot.ts" />
    </ItemGroup>
    <ItemGroup>
        <PackageReference Include="Microsoft.AspNetCore.All" Version="2.0.0" />
        <PackageReference Include="Microsoft.AspNetCore.SpaServices" Version="2.0.0" />
    </ItemGroup>
    <ItemGroup>
        <DotNetCliToolReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Tools" Version="2.0.0" />
        <DotNetCliToolReference Include="Microsoft.EntityFrameworkCore.Tools.DotNet" Version="2.0.0" />
        <DotNetCliToolReference Include="Microsoft.Extensions.Caching.SqlConfig.Tools" Version="2.0.0" />
    </ItemGroup>
    <ItemGroup>
        <TypeScriptCompile Include="ClientApp\app\models\cart.model.ts" />
        <TypeScriptCompile Include="ClientApp\app\store\cartDetail.component.ts" />
        <TypeScriptCompile Include="ClientApp\boot.ts" />
    </ItemGroup>
    </Project>

Use the following for Listing 9-16:

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

    namespace SportsStore {

        public class Startup {

            public Startup(IConfiguration configuration) {
                Configuration = configuration;
            }

            public IConfiguration Configuration { get; }

            public void ConfigureServices(IServiceCollection services) {
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
            }

            public void Configure(IApplicationBuilder app, 
                    IHostingEnvironment env, DataContext context) {

                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true
                });

                app.UseStaticFiles();
                app.UseSession();

                app.UseMvc(routes => {
                    routes.MapRoute(
                        name: "default",
                        template: "{controller=Home}/{action=Index}/{id?}");

                    routes.MapSpaFallbackRoute("angular-fallback", 
                        new { controller = "Home", action = "Index" });
                });

                SeedData.SeedDatabase(context);

            }
        }
    }

After running the command in Listing 9-22, run this command to apply the migration to the database:

    dotnet ef database update

    ---

## Chapter 10

No changes are required for this chapter.

---

## Chapter 11

Do not use the commands in Listing 11-7. The meta-package that is used in ASP.NET Core 2 already includes the packages required for this chapter.

Use the following for Listing 11-8:

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;

    namespace SportsStore.Models {

        public class IdentityDataContext : IdentityDbContext<IdentityUser> {

            public IdentityDataContext(DbContextOptions<IdentityDataContext> options)
                : base(options) { }
        }
    }

Use the following for Listing 11-9:

    using System;
    using System.Linq;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using System.Threading.Tasks;

    namespace SportsStore.Models {

        public static class IdentitySeedData {
            private const string adminUser = "admin";
            private const string adminPassword = "MySecret123$";
            private const string adminRole = "Administrator";

            public static async Task SeedDatabase(IdentityDataContext context,
                    UserManager<IdentityUser> userManager,
                    RoleManager<IdentityRole> roleManager) {

                if (context.Database.GetMigrations().Count() > 0
                        && context.Database.GetPendingMigrations().Count() == 0) {

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
            }

        }
    }

Usr the following for Listing 11-10:

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

After running the command in Listing 11-12, run this command to apply the migration to the database:

    dotnet ef database update --context IdentityDataContext

Use the following for Listing 11-27:

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

                services.AddAuthentication(
                        CookieAuthenticationDefaults.AuthenticationScheme)
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

---

## Chapter 12

Use the following for Listing 12-8:

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

                services.AddAuthentication(
                        CookieAuthenticationDefaults.AuthenticationScheme)
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

                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true
                });

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


                SeedData.SeedDatabase(context);
                IdentitySeedData.SeedDatabase(identityContext, 
                    userManager, roleManager).GetAwaiter().GetResult();
            }
        }
    }

Ignore the commands in Listing 12-9. The meta-package used by ASP.NET Core 2 already includes the required package.

Use the following for Listing 12-10:

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

                services.AddAuthentication(
                        CookieAuthenticationDefaults.AuthenticationScheme)
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

                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true
                });

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
                    SeedData.SeedDatabase(context);
                    IdentitySeedData.SeedDatabase(identityContext, 
                        userManager, roleManager).GetAwaiter().GetResult();
                    System.Console.WriteLine("Database Preparation Complete");                
                    System.Environment.Exit(0);
                }
            }
        }
    }

Use the following for Listing 12-11:

    using System;
    using System.Linq;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using System.Threading.Tasks;

    namespace SportsStore.Models {

        public static class IdentitySeedData {
            private const string adminUser = "admin";
            private const string adminPassword = "MySecret123$";
            private const string adminRole = "Administrator";

            public static async Task SeedDatabase(IApplicationBuilder app) {
                (GetAppService<IdentityDataContext>(app)).Database.Migrate();

                // ...statements omitted for brevity...
            }

            private static T GetAppService<T>(IApplicationBuilder app) {
                return app.ApplicationServices.GetRequiredService<T>();
            }
        }
    }

Use the following for Listing 12-13:

    ...
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
    ...
