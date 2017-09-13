using Microsoft.AspNetCore.Mvc;
using SportsStore.Models;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace SportsStore.Controllers {
    public class HomeController : Controller {
        private DataContext context;

        public HomeController(DataContext ctx) {
            context = ctx;
        }

        public IActionResult Index() {
            ViewBag.Message = "Sports Store App";
            return View(context.Products.First());
        }

        [Authorize]
        public string Protected() {
            return "You have been authenticated";
        }
    }
}
