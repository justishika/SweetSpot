import { useState } from "react";
import { Link, useRoute, useLocation } from "wouter";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export default function ProductDetail() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/product/:id");
  
  // Find the product by ID
  const productId = params?.id ? parseInt(params.id) : 0;
  const product = products.find(p => p.id === productId);
  
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
            <div className="mb-4 bg-white rounded-2xl overflow-hidden shadow-sm">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
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
                    alt={`${product.name} view ${idx + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                {product.tags && product.tags.length > 0 && (
                  <span className={`${
                    product.tags[0] === 'Vegan' || product.tags[0] === 'Gluten-Free' || product.tags[0] === 'Low Sugar' ? 
                      'bg-secondary text-neutral-900' : 
                    product.tags[0] === 'Best Seller' ? 
                      'bg-accent text-neutral-900' : 
                      'bg-primary text-white'
                  } text-xs font-poppins font-medium px-3 py-1 rounded-full`}>
                    {product.tags[0]}
                  </span>
                )}
                <div className="flex items-center">
                  <i className="ri-star-fill text-yellow-400 mr-1"></i>
                  <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                  <span className="text-neutral-600 text-sm ml-1">({product.reviewCount || "124"} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-poppins font-semibold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <img 
                    src={product.baker?.avatar || "https://randomuser.me/api/portraits/women/44.jpg"} 
                    alt="Baker profile" 
                    className="w-8 h-8 rounded-full mr-2" 
                  />
                  <span className="text-sm">By <a href="#" className="text-primary hover:underline">{product.baker?.name || "Sweet Dreams Bakery"}</a></span>
                </div>
              </div>
              
              <p className="text-neutral-600 mb-6">
                {product.description}
              </p>
              
              <div className="border-t border-b border-neutral-200 py-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-poppins font-medium">Size</span>
                  <div className="flex space-x-2">
                    <button 
                      className={`${
                        selectedSize === "6\"" 
                          ? "bg-primary-light border-primary" 
                          : "bg-white border-neutral-200 hover:border-primary"
                      } border text-neutral-900 rounded-full px-4 py-1 text-sm font-medium`}
                      onClick={() => setSelectedSize("6\"")}
                    >
                      6"
                    </button>
                    <button 
                      className={`${
                        selectedSize === "8\"" 
                          ? "bg-primary-light border-primary" 
                          : "bg-white border-neutral-200 hover:border-primary"
                      } border text-neutral-900 rounded-full px-4 py-1 text-sm font-medium`}
                      onClick={() => setSelectedSize("8\"")}
                    >
                      8"
                    </button>
                    <button 
                      className={`${
                        selectedSize === "10\"" 
                          ? "bg-primary-light border-primary" 
                          : "bg-white border-neutral-200 hover:border-primary"
                      } border text-neutral-900 rounded-full px-4 py-1 text-sm font-medium`}
                      onClick={() => setSelectedSize("10\"")}
                    >
                      10"
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="font-poppins font-medium">Frosting</span>
                  <select 
                    className="border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary"
                    value={selectedFrosting}
                    onChange={(e) => setSelectedFrosting(e.target.value)}
                  >
                    <option>Chocolate Ganache</option>
                    <option>Buttercream</option>
                    <option>Cream Cheese</option>
                    <option>Fondant</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="font-poppins font-medium block mb-2">Message on Cake</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Happy Birthday!" 
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary"
                    value={cakeMessage}
                    onChange={(e) => setCakeMessage(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="inline-flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox rounded text-primary focus:ring-primary h-4 w-4"
                      checked={addCandles}
                      onChange={() => setAddCandles(!addCandles)}
                    />
                    <span className="ml-2 text-sm">Add candles (+$2.50)</span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-2xl font-poppins font-semibold">{formatPrice(product.price)}</span>
                  <div className="text-sm text-neutral-600">Free delivery in 2-3 days</div>
                </div>
                
                <div className="flex items-center border border-neutral-200 rounded-lg">
                  <button 
                    className="px-3 py-2 text-neutral-900 hover:text-primary"
                    onClick={decreaseQuantity}
                  >
                    <i className="ri-subtract-line"></i>
                  </button>
                  <input 
                    type="text" 
                    value={quantity} 
                    readOnly
                    className="w-12 text-center border-none focus:outline-none text-neutral-900 font-medium" 
                  />
                  <button 
                    className="px-3 py-2 text-neutral-900 hover:text-primary"
                    onClick={increaseQuantity}
                  >
                    <i className="ri-add-line"></i>
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button 
                  className="bg-primary hover:bg-primary-dark text-white font-poppins font-medium px-6 py-3 rounded-full transition-colors shadow-sm flex-1"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button className="bg-white hover:bg-neutral-100 text-neutral-900 font-poppins font-medium px-6 py-3 rounded-full transition-colors shadow-sm border border-neutral-200">
                  <i className="ri-heart-line mr-1"></i> Save
                </button>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <div className="flex border-b border-neutral-200">
                <button 
                  className={`font-poppins font-medium pb-3 px-4 ${
                    activeTab === "details" 
                      ? "border-b-2 border-primary text-primary" 
                      : "text-neutral-600"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
                <button 
                  className={`font-poppins font-medium pb-3 px-4 ${
                    activeTab === "ingredients" 
                      ? "border-b-2 border-primary text-primary" 
                      : "text-neutral-600"
                  }`}
                  onClick={() => setActiveTab("ingredients")}
                >
                  Ingredients
                </button>
                <button 
                  className={`font-poppins font-medium pb-3 px-4 ${
                    activeTab === "reviews" 
                      ? "border-b-2 border-primary text-primary" 
                      : "text-neutral-600"
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
        
        {/* You Might Also Like */}
        <div className="mb-12">
          <h2 className="text-2xl font-poppins font-semibold mb-6">You Might Also Like</h2>
          
          <div className="flex space-x-6 overflow-x-auto pb-4 no-scrollbar">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="bg-white rounded-2xl shadow-sm overflow-hidden card-hover min-w-[280px] max-w-[280px]">
                <Link href={`/product/${relatedProduct.id}`}>
                  <div className="relative">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="w-full h-48 object-cover" 
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-poppins font-medium">{relatedProduct.name}</h3>
                      <div className="flex items-center">
                        <i className="ri-star-fill text-yellow-400 mr-1"></i>
                        <span className="text-sm">{relatedProduct.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-poppins font-semibold">{formatPrice(relatedProduct.price)}</span>
                      <button 
                        className="bg-primary hover:bg-primary-dark text-white font-poppins font-medium rounded-full px-3 py-1 text-xs transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(relatedProduct, 1);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
