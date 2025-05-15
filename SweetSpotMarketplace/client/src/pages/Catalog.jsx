import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import PropTypes from "prop-types";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const DIETARY_FILTERS = ["All", "Vegan", "Gluten-Free", "Nut-Free", "Low Sugar"];
const SORT_OPTIONS = ["Newest", "Bestselling", "Price (Low to High)", "Price (High to Low)", "Rating"];
const OCCASION_FILTERS = ["Birthday", "Wedding", "Anniversary", "Holiday"];
const FLAVOR_FILTERS = ["Chocolate", "Vanilla", "Fruit", "Caramel"];

export default function Catalog() {
  const [location] = useLocation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [occasionFilters, setOccasionFilters] = useState([]);
  const [flavorFilters, setFlavorFilters] = useState([]);
  const [priceRange, setPriceRange] = useState(50);
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
        product.occasions?.some(occasion => occasionFilters.includes(occasion))
      );
    }
    
    // Apply flavor filters
    if (flavorFilters.length > 0) {
      filtered = filtered.filter(product => 
        product.flavors?.some(flavor => flavorFilters.includes(flavor))
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
  const toggleOccasionFilter = (occasion) => {
    if (occasionFilters.includes(occasion)) {
      setOccasionFilters(occasionFilters.filter(o => o !== occasion));
    } else {
      setOccasionFilters([...occasionFilters, occasion]);
    }
  };

  // Toggle flavor filter
  const toggleFlavorFilter = (flavor) => {
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
              onChange={(e) => setSortOption(e.target.value)}
            >
              {SORT_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2 md:gap-4">
              {DIETARY_FILTERS.map(filter => (
                <button 
                  key={filter}
                  className={`${
                    activeFilter === filter 
                      ? "bg-primary text-white" 
                      : "bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-200"
                  } font-poppins font-medium text-sm px-4 py-2 rounded-full`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
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
                    {OCCASION_FILTERS.map(occasion => (
                      <label key={occasion} className="flex items-center">
                        <input 
                          type="checkbox"
                          className="form-checkbox text-primary rounded border-neutral-300"
                          checked={occasionFilters.includes(occasion)}
                          onChange={() => toggleOccasionFilter(occasion)}
                        />
                        <span className="ml-2 text-sm">{occasion}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-poppins font-medium mb-2">Flavor</h4>
                  <div className="space-y-2">
                    {FLAVOR_FILTERS.map(flavor => (
                      <label key={flavor} className="flex items-center">
                        <input 
                          type="checkbox"
                          className="form-checkbox text-primary rounded border-neutral-300"
                          checked={flavorFilters.includes(flavor)}
                          onChange={() => toggleFlavorFilter(flavor)}
                        />
                        <span className="ml-2 text-sm">{flavor}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-poppins font-medium mb-2">Price Range</h4>
                  <div className="px-2">
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-neutral-600">
                      <span>$0</span>
                      <span>${priceRange}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-emotion-sad-line text-4xl text-neutral-300 mb-2"></i>
            <h3 className="text-lg font-poppins font-medium mb-2">No Results Found</h3>
            <p className="text-neutral-600">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 