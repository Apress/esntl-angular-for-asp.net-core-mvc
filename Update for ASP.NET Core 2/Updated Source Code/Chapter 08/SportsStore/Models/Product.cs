using System.Collections.Generic;

namespace SportsStore.Models {
    public class Product {

        public long ProductId { get; set; }
        
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        public Supplier Supplier { get; set; }
        public List<Rating> Ratings { get; set; }
    }
}
