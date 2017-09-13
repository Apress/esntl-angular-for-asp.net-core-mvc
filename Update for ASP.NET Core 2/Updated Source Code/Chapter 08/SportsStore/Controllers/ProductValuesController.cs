using Microsoft.AspNetCore.Mvc;
using SportsStore.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using SportsStore.Models.BindingTargets;
using Microsoft.AspNetCore.JsonPatch;

namespace SportsStore.Controllers {

    [Route("api/products")]
    public class ProductValuesController : Controller {
        private DataContext context;

        public ProductValuesController(DataContext ctx) {
            context = ctx;
        }

        [HttpGet("{id}")]
        public Product GetProduct(long id) {
            Product result = context.Products
                          .Include(p => p.Supplier).ThenInclude(s => s.Products)
                          .Include(p => p.Ratings)
                          .First(p => p.ProductId == id);

            if (result != null) {
                if (result.Supplier != null) {
                    result.Supplier.Products = result.Supplier.Products.Select(p =>
                        new Product {
                            ProductId = p.ProductId,
                            Name = p.Name,
                            Category = p.Category,
                            Description = p.Description,
                            Price = p.Price,
                        });
                }

                if (result.Ratings != null) {
                    foreach (Rating r in result.Ratings) {
                        r.Product = null;
                    }
                }
            }
            return result;
        }

        [HttpGet]
        public IActionResult GetProducts(string category, string search,
                bool related = false, bool metadata = false) {
            IQueryable<Product> query = context.Products;

            if (!string.IsNullOrWhiteSpace(category)) {
                string catLower = category.ToLower();
                query = query.Where(p => p.Category.ToLower().Contains(catLower));
            }
            if (!string.IsNullOrWhiteSpace(search)) {
                string searchLower = search.ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(searchLower)
                    || p.Description.ToLower().Contains(searchLower));
            }

            if (related) {
                query = query.Include(p => p.Supplier).Include(p => p.Ratings);
                List<Product> data = query.ToList();
                data.ForEach(p => {
                    if (p.Supplier != null) {
                        p.Supplier.Products = null;
                    }
                    if (p.Ratings != null) {
                        p.Ratings.ForEach(r => r.Product = null);
                    }
                });
                return metadata ? CreateMetadata(data) : Ok(data);
            } else {
                return metadata ? CreateMetadata(query) : Ok(query);
            }
        }

        private IActionResult CreateMetadata(IEnumerable<Product> products) {
            return Ok(new {
                data = products,
                categories = context.Products.Select(p => p.Category)
                    .Distinct().OrderBy(c => c)
            });
        }
    

        [HttpPost]
        public IActionResult CreateProduct([FromBody] ProductData pdata) {
            if (ModelState.IsValid) {
                Product p = pdata.Product;
                if (p.Supplier != null && p.Supplier.SupplierId != 0) {
                    context.Attach(p.Supplier);
                }
                context.Add(p);
                context.SaveChanges();
                return Ok(p.ProductId);
            } else {
                return BadRequest(ModelState);
            }
        }

        [HttpPut("{id}")]
        public IActionResult ReplaceProduct(long id, [FromBody] ProductData pdata) {
            if (ModelState.IsValid) {
                Product p = pdata.Product;
                p.ProductId = id;
                if (p.Supplier != null && p.Supplier.SupplierId != 0) {
                    context.Attach(p.Supplier);
                }
                context.Update(p);
                context.SaveChanges();
                return Ok();
            } else {
                return BadRequest(ModelState);
            }
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateProduct(long id, 
                [FromBody]JsonPatchDocument<ProductData> patch) {

            Product product = context.Products
                                .Include(p => p.Supplier)
                                .First(p => p.ProductId == id);
            ProductData pdata = new ProductData { Product = product };
            patch.ApplyTo(pdata, ModelState);

            if (ModelState.IsValid && TryValidateModel(pdata)) {

                if (product.Supplier != null && product.Supplier.SupplierId != 0) {
                    context.Attach(product.Supplier);
                }
                context.SaveChanges();
                return Ok();
            } else {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")]
        public void DeleteProduct(long id) {
            context.Products.Remove(new Product { ProductId = id });
            context.SaveChanges();
        }
    }
}
