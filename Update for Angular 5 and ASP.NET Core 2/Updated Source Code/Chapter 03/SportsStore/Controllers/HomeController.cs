using Microsoft.AspNetCore.Mvc;

namespace SportsStore.Controllers {
    public class HomeController : Controller {

        public IActionResult Index() {
            ViewBag.Message = "Sports Store App";
            return View();
        }
    }
}
