import { useState } from "react";
import { Link } from "wouter";
import { Product } from "@/types";
import { formatPrice, truncateText } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  product: Product;
  featured?: boolean;
};

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  const { id, name, image, price, description, rating, baker, tags } = product;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden card-hover">
      <Link href={`/product/${id}`}>
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4">
            <button 
              className="bg-white/90 hover:bg-white text-neutral-900 rounded-full p-2 transition-colors" 
              onClick={toggleFavorite}
            >
              <i className={`${isFavorite ? 'ri-heart-fill text-red-500' : 'ri-heart-line'} text-lg`}></i>
            </button>
          </div>
          {tags && tags.length > 0 && (
            <div className="absolute top-4 left-4">
              <span className={`${
                tags[0] === 'Vegan' || tags[0] === 'Gluten-Free' || tags[0] === 'Low Sugar' ? 
                  'bg-secondary text-neutral-900' : 
                tags[0] === 'Best Seller' ? 
                  'bg-accent text-neutral-900' : 
                  'bg-primary text-white'
              } text-xs font-poppins font-medium px-3 py-1 rounded-full`}>
                {tags[0]}
              </span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-poppins font-medium text-lg">{name}</h3>
          <div className="flex items-center">
            <i className="ri-star-fill text-yellow-400 mr-1"></i>
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="text-neutral-600 text-sm mb-4">
          {truncateText(description, featured ? 100 : 80)}
        </p>
        
        {baker && (
          <div className="flex items-center mb-4">
            <img 
              src={baker.avatar} 
              alt={`${baker.name} profile`} 
              className="w-6 h-6 rounded-full mr-2" 
            />
            <span className="text-xs text-neutral-600">By {baker.name}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="font-poppins font-semibold text-lg">{formatPrice(price)}</span>
          <button 
            className="bg-primary hover:bg-primary-dark text-white font-poppins font-medium rounded-full px-4 py-2 text-sm transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
