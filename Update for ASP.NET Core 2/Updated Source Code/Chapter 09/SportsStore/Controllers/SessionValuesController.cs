using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SportsStore.Models;
using SportsStore.Models.BindingTargets;

namespace SportsStore.Controllers {

    [Route("/api/session")]
    public class SessionValuesController : Controller {

        [HttpGet("cart")]
        public IActionResult GetCart() {
            return Ok(HttpContext.Session.GetString("cart"));
        }

        [HttpPost("cart")]
        public void StoreCart([FromBody] ProductSelection[] products) {
            var jsonData = JsonConvert.SerializeObject(products);
            HttpContext.Session.SetString("cart", jsonData);
        }

        [HttpGet("checkout")]
        public IActionResult GetCheckout() {
            return Ok(HttpContext.Session.GetString("checkout"));
        }

        [HttpPost("checkout")]
        public void StoreCheckout([FromBody] CheckoutState data) {
            HttpContext.Session.SetString("checkout", 
                JsonConvert.SerializeObject(data));
        }
    }
}
