import { useState } from "react";
import { Link, useRoute, useLocation } from "wouter";
import PropTypes from "prop-types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useLike } from "@/context/LikeContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/product/:id");
  
  // Add debugging logs
  console.log("URL params:", params);
  
  // Find the product by ID (converting both IDs to strings for comparison)
  const product = products.find(p => String(p.id) === params?.id);
  
  console.log("Found product:", product);
  
  // If product not found, redirect to catalog
  if (!product) {
    setLocation("/catalog");
    return null;
  }
  
  // State for product options
  const [selectedSize, setSelectedSize] = useState("8\"");
  const [selectedFrosting, setSelectedFrosting] = useState("Chocolate Ganache");
  const [cakeMessage, setCakeMessage] = useState("");
  const [addCandles, setAddCandles] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [mainImage, setMainImage] = useState(product.image);
  
  const { addToCart } = useCart();
  const { isLiked, toggleLike } = useLike();
  
  // Generate related products (excluding current product)
  const relatedProducts = products
    .filter(p => p.id !== product.id)
    .sort(() => 0.5 - Math.random()) // Simple shuffle
    .slice(0, 4);
  
  // Handle quantity change
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  
  // Handle Add to Cart
  const handleAddToCart = () => {
    const options = {
      size: selectedSize,
      frosting: selectedFrosting,
      message: cakeMessage || "None",
      candles: addCandles ? "Yes" : "No"
    };
    
    addToCart(product, quantity, options);
  };

  // Handle Like Toggle
  const handleLikeToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(product.id);
  };
  
  // Product details tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div className="py-4">
            <div className="mb-4">
              <h3 className="font-poppins font-medium mb-2">Description</h3>
              <p className="text-neutral-600 text-sm">
                {product.description}
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-poppins font-medium mb-2">Allergens</h3>
              <p className="text-neutral-600 text-sm">
                Contains: Wheat, Eggs, Dairy, Soy. May contain traces of nuts.
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-poppins font-medium mb-2">Storage</h3>
              <p className="text-neutral-600 text-sm">
                Keep refrigerated. Best consumed within 3 days of delivery.
              </p>
            </div>
            
            <div>
              <h3 className="font-poppins font-medium mb-2">Delivery</h3>
              <p className="text-neutral-600 text-sm">
                Available for delivery within 10 miles of baker's location. Special orders may require 48 hours notice.
              </p>
            </div>
          </div>
        );
      
      case "ingredients":
        return (
          <div className="py-4">
            <h3 className="font-poppins font-medium mb-2">Ingredients</h3>
            <ul className="list-disc pl-5 text-neutral-600 text-sm space-y-1">
              <li>Organic all-purpose flour</li>
              <li>Cage-free eggs</li>
              <li>Unsalted butter</li>
              <li>Belgian chocolate (dark, milk, white)</li>
              <li>Organic cane sugar</li>
              <li>Pure vanilla extract</li>
              <li>Baking powder</li>
              <li>Sea salt</li>
              <li>Heavy cream</li>
            </ul>
          </div>
        );
      
      case "reviews":
        return (
          <div className="py-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-poppins font-medium">Customer Reviews</h3>
              <button className="text-primary hover:text-primary-dark text-sm font-medium">Write a Review</button>
            </div>
            
            <div className="space-y-4">
              <div className="pb-4 border-b border-neutral-200">
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400"></i>
                    ))}
                  </div>
                  <span className="text-sm font-medium">Sarah L.</span>
                  <span className="text-xs text-neutral-600 ml-2">2 weeks ago</span>
                </div>
                <p className="text-sm text-neutral-700">
                  Absolutely delicious! The cake was moist and the chocolate layers were perfectly balanced. Delivery was prompt and it was exactly as pictured. Will order again!
                </p>
              </div>
              
              <div className="pb-4 border-b border-neutral-200">
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400"></i>
                    ))}
                  </div>
                  <span className="text-sm font-medium">Michael T.</span>
                  <span className="text-xs text-neutral-600 ml-2">1 month ago</span>
                </div>
                <p className="text-sm text-neutral-700">
                  Ordered this for my wife's birthday and it was a hit! The frosting was perfect and everyone loved the taste. Would highly recommend!
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="pt-8 fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li><Link href="/" className="text-neutral-600 hover:text-primary">Home</Link></li>
            <li><span className="text-neutral-600 mx-2">/</span></li>
            <li><Link href="/catalog" className="text-neutral-600 hover:text-primary">Catalog</Link></li>
            <li><span className="text-neutral-600 mx-2">/</span></li>
            <li><Link href={`/catalog?category=${product.category || 1}`} className="text-neutral-600 hover:text-primary">{product.categoryName || "Cakes"}</Link></li>
            <li><span className="text-neutral-600 mx-2">/</span></li>
            <li className="text-neutral-900 font-medium">{product.name}</li>
          </ol>
        </nav>
        
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Product Images */}
          <div className="lg:w-3/5">
            <div className="relative mb-4 bg-white rounded-2xl overflow-hidden shadow-sm">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
              <button 
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-neutral-900 rounded-full p-2 transition-colors"
                onClick={handleLikeToggle}
              >
                <i className={`${isLiked(product.id) ? 'ri-heart-fill text-red-500' : 'ri-heart-line'} text-lg`}></i>
              </button>
            </div>
            
            <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
              <button 
                className="w-24 h-24 rounded-xl overflow-hidden shadow-sm border-2 border-primary"
                onClick={() => setMainImage(product.image)}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                />
              </button>
              
              {product.galleryImages?.map((img, idx) => (
                <button 
                  key={idx}
                  className="w-24 h-24 rounded-xl overflow-hidden shadow-sm border-2 border-transparent hover:border-primary"
                  onClick={() => setMainImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${idx + 2}`} 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-poppins font-semibold mb-2">{product.name}</h1>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      <i className="ri-star-fill text-yellow-400 mr-1"></i>
                      <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-neutral-600">(24 reviews)</span>
                  </div>
                  <span className="font-poppins font-semibold text-xl">{formatPrice(product.price)}</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-poppins font-medium mb-2">Size</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["6\"", "8\"", "10\""].map(size => (
                      <button
                        key={size}
                        className={`py-2 rounded-lg border ${
                          selectedSize === size
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-neutral-200 hover:border-primary"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block font-poppins font-medium mb-2">Frosting</label>
                  <select
                    value={selectedFrosting}
                    onChange={(e) => setSelectedFrosting(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-primary"
                  >
                    <option>Chocolate Ganache</option>
                    <option>Vanilla Buttercream</option>
                    <option>Cream Cheese</option>
                    <option>Whipped Cream</option>
                  </select>
                </div>
                
                <div>
                  <label className="block font-poppins font-medium mb-2">Cake Message</label>
                  <input
                    type="text"
                    value={cakeMessage}
                    onChange={(e) => setCakeMessage(e.target.value)}
                    placeholder="e.g. Happy Birthday!"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={addCandles}
                      onChange={(e) => setAddCandles(e.target.checked)}
                      className="form-checkbox text-primary rounded border-neutral-300"
                    />
                    <span className="ml-2">Add birthday candles (+$2.00)</span>
                  </label>
                </div>
                
                <div>
                  <label className="block font-poppins font-medium mb-2">Quantity</label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={decreaseQuantity}
                      className="p-2 rounded-lg border border-neutral-200 hover:border-primary"
                    >
                      <i className="ri-subtract-line"></i>
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="p-2 rounded-lg border border-neutral-200 hover:border-primary"
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-poppins font-medium rounded-full py-3 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            
            {/* Product Tabs */}
            <div className="mt-8">
              <div className="flex border-b border-neutral-200">
                <button
                  className={`px-6 py-3 font-poppins font-medium text-sm ${
                    activeTab === "details"
                      ? "text-primary border-b-2 border-primary"
                      : "text-neutral-600 hover:text-primary"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
                <button
                  className={`px-6 py-3 font-poppins font-medium text-sm ${
                    activeTab === "ingredients"
                      ? "text-primary border-b-2 border-primary"
                      : "text-neutral-600 hover:text-primary"
                  }`}
                  onClick={() => setActiveTab("ingredients")}
                >
                  Ingredients
                </button>
                <button
                  className={`px-6 py-3 font-poppins font-medium text-sm ${
                    activeTab === "reviews"
                      ? "text-primary border-b-2 border-primary"
                      : "text-neutral-600 hover:text-primary"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
              </div>
              
              {renderTabContent()}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-poppins font-semibold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 