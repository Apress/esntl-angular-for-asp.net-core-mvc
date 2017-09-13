namespace SportsStore.Models {
    public class Rating {

        public long RatingId { get; set; }

        public int Stars { get; set; }

        public Product Product { get; set; }

    }
}
