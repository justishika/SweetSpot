import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

// Define filter options
type DietaryFilter = "All" | "Vegan" | "Gluten-Free" | "Nut-Free" | "Low Sugar";
type SortOption = "Newest" | "Bestselling" | "Price (Low to High)" | "Price (High to Low)" | "Rating";
type OccasionFilter = "Birthday" | "Wedding" | "Anniversary" | "Holiday";
type FlavorFilter = "Chocolate" | "Vanilla" | "Fruit" | "Caramel";

export default function Catalog() {
  const [location] = useLocation();
  const [activeFilter, setActiveFilter] = useState<DietaryFilter>("All");
  const [sortOption, setSortOption] = useState<SortOption>("Newest");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [occasionFilters, setOccasionFilters] = useState<OccasionFilter[]>([]);
  const [flavorFilters, setFlavorFilters] = useState<FlavorFilter[]>([]);
  const [priceRange, setPriceRange] = useState<number>(50);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Parse query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.split('?')[1]);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      // Filter products by category (assuming products have a category property)
      // This would be implemented with a proper category filter in a real app
    }
  }, [location]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];
    
    // Apply dietary filter
    if (activeFilter !== "All") {
      filtered = filtered.filter(product => 
        product.tags?.includes(activeFilter)
      );
    }
    
    // Apply occasion filters
    if (occasionFilters.length > 0) {
      filtered = filtered.filter(product => 
        product.occasions?.some(occasion => occasionFilters.includes(occasion as OccasionFilter))
      );
    }
    
    // Apply flavor filters
    if (flavorFilters.length > 0) {
      filtered = filtered.filter(product => 
        product.flavors?.some(flavor => flavorFilters.includes(flavor as FlavorFilter))
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(product => product.price <= priceRange);
    
    // Apply sorting
    switch (sortOption) {
      case "Bestselling":
        filtered.sort((a, b) => b.sales - a.sales);
        break;
      case "Price (Low to High)":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price (High to Low)":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // Newest
        filtered.sort((a, b) => b.id - a.id);
    }
    
    setFilteredProducts(filtered);
  }, [activeFilter, sortOption, occasionFilters, flavorFilters, priceRange]);

  // Toggle occasion filter
  const toggleOccasionFilter = (occasion: OccasionFilter) => {
    if (occasionFilters.includes(occasion)) {
      setOccasionFilters(occasionFilters.filter(o => o !== occasion));
    } else {
      setOccasionFilters([...occasionFilters, occasion]);
    }
  };

  // Toggle flavor filter
  const toggleFlavorFilter = (flavor: FlavorFilter) => {
    if (flavorFilters.includes(flavor)) {
      setFlavorFilters(flavorFilters.filter(f => f !== flavor));
    } else {
      setFlavorFilters([...flavorFilters, flavor]);
    }
  };

  return (
    <div className="pt-8 fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-poppins font-semibold mb-2">Dessert Catalog</h1>
            <p className="text-neutral-600">Discover delicious treats from our talented bakers</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-sm text-neutral-600 mr-2">Sort by:</span>
            <select
              className="border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary font-quicksand text-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
            >
              <option>Newest</option>
              <option>Bestselling</option>
              <option>Price (Low to High)</option>
              <option>Price (High to Low)</option>
              <option>Rating</option>
            </select>
          </div>
        </div>
        
        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2 md:gap-4">
              <button 
                className={`${
                  activeFilter === "All" 
                    ? "bg-primary text-white" 
                    : "bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-200"
                } font-poppins font-medium text-sm px-4 py-2 rounded-full`}
                onClick={() => setActiveFilter("All")}
              >
                All
              </button>
              <button 
                className={`${
                  activeFilter === "Vegan" 
                    ? "bg-primary text-white" 
                    : "bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-200"
                } font-poppins font-medium text-sm px-4 py-2 rounded-full`}
                onClick={() => setActiveFilter("Vegan")}
              >
                Vegan
              </button>
              <button 
                className={`${
                  activeFilter === "Gluten-Free" 
                    ? "bg-primary text-white" 
                    : "bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-200"
                } font-poppins font-medium text-sm px-4 py-2 rounded-full`}
                onClick={() => setActiveFilter("Gluten-Free")}
              >
                Gluten-Free
              </button>
              <button 
                className={`${
                  activeFilter === "Nut-Free" 
                    ? "bg-primary text-white" 
                    : "bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-200"
                } font-poppins font-medium text-sm px-4 py-2 rounded-full`}
                onClick={() => setActiveFilter("Nut-Free")}
              >
                Nut-Free
              </button>
              <button 
                className={`${
                  activeFilter === "Low Sugar" 
                    ? "bg-primary text-white" 
                    : "bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-200"
                } font-poppins font-medium text-sm px-4 py-2 rounded-full`}
                onClick={() => setActiveFilter("Low Sugar")}
              >
                Low Sugar
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                className="text-neutral-600 hover:text-neutral-900 p-2 rounded-full hover:bg-neutral-100"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <i className="ri-filter-3-line"></i>
                <span className="ml-1">More Filters</span>
              </button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-poppins font-medium mb-2">Occasion</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox rounded text-primary focus:ring-primary h-4 w-4"
                        checked={occasionFilters.includes("Birthday")}
                        onChange={() => toggleOccasionFilter("Birthday")}
                      />
                      <span className="ml-2 text-sm">Birthday</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox rounded text-primary focus:ring-primary h-4 w-4"
                        checked={occasionFilters.includes("Wedding")}
                        onChange={() => toggleOccasionFilter("Wedding")}
                      />
                      <span className="ml-2 text-sm">Wedding</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox rounded text-primary focus:ring-primary h-4 w-4"
                        checked={occasionFilters.includes("Anniversary")}
                        onChange={() => toggleOccasionFilter("Anniversary")}
                      />
                      <span className="ml-2 text-sm">Anniversary</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox rounded text-primary focus:ring-primary h-4 w-4"
                        checked={occasionFilters.includes("Holiday")}
                        onChange={() => toggleOccasionFilter("Holiday")}
                      />
                      <span className="ml-2 text-sm">Holiday</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-poppins font-medium mb-2">Flavor</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox rounded text-primary focus:ring-primary h-4 w-4"
                        checked={flavorFilters.includes("Chocolate")}
                        onChange={() => toggleFlavorFilter("Chocolate")}
                      />
                      <span className="ml-2 text-sm">Chocolate</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox rounded text-primary focus:ring-primary h-4 w-4"
                        checked={flavorFilters.includes("Vanilla")}
                        onChange={() => toggleFlavorFilter("Vanilla")}
                      />
                      <span className="ml-2 text-sm">Vanilla</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox rounded text-primary focus:ring-primary h-4 w-4"
                        checked={flavorFilters.includes("Fruit")}
                        onChange={() => toggleFlavorFilter("Fruit")}
                      />
                      <span className="ml-2 text-sm">Fruit</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox rounded text-primary focus:ring-primary h-4 w-4"
                        checked={flavorFilters.includes("Caramel")}
                        onChange={() => toggleFlavorFilter("Caramel")}
                      />
                      <span className="ml-2 text-sm">Caramel</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-poppins font-medium mb-2">Price Range</h4>
                  <div className="px-2">
                    <input 
                      type="range" 
                      min="5" 
                      max="100" 
                      value={priceRange} 
                      onChange={(e) => setPriceRange(parseInt(e.target.value))}
                      className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                    />
                    <div className="flex justify-between text-xs text-neutral-600 mt-1">
                      <span>$5</span>
                      <span>${priceRange}+</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button 
                  className="bg-primary hover:bg-primary-dark text-white font-poppins font-medium text-sm px-6 py-2 rounded-full"
                  onClick={() => {
                    // Reset all filters
                    setActiveFilter("All");
                    setOccasionFilters([]);
                    setFlavorFilters([]);
                    setPriceRange(50);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Catalog Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="ri-search-line text-4xl text-neutral-400 mb-2"></i>
            <h3 className="text-xl font-poppins font-medium mb-2">No desserts found</h3>
            <p className="text-neutral-600">
              Try adjusting your filters to find more delicious treats.
            </p>
          </div>
        )}
        
        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100">
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-medium">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100">3</button>
              <span className="px-2 text-neutral-600">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100">10</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100">
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
