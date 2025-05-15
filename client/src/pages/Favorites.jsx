import { useLike } from "@/context/LikeContext";
import ProductCard from "@/components/ProductCard";
import { Link } from "wouter";
import { products } from "@/data/products";

export default function Favorites() {
  const { likedDesserts } = useLike();
  const likedProducts = products.filter(product => likedDesserts.includes(product.id));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-poppins font-semibold mb-8">My Favorites</h1>
      
      {likedProducts.length === 0 ? (
        <div className="text-center py-12">
          <i className="ri-heart-line text-4xl text-neutral-400 mb-4"></i>
          <h2 className="text-xl font-poppins font-medium mb-2">No favorites yet</h2>
          <p className="text-neutral-600 mb-6">
            Start adding desserts to your favorites by clicking the heart icon on any dessert card.
          </p>
          <Link 
            href="/catalog"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-poppins font-medium rounded-full px-6 py-3 transition-colors"
          >
            Browse Desserts
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {likedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
} 