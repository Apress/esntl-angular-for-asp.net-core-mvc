using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.Webpack;

namespace SportsStore {
  public class Startup {
    public Startup(IConfiguration configuration) {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }


    public void ConfigureServices(IServiceCollection services) {
      services.AddMvc();
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env) {

      app.UseDeveloperExceptionPage();
      app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
          HotModuleReplacement = true
      });

      //if (env.IsDevelopment()) {
      //  app.UseDeveloperExceptionPage();
      //} else {
      //  app.UseExceptionHandler("/Home/Error");
      //}

      app.UseStaticFiles();

      app.UseMvc(routes => {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
      });
    }
  }
}
