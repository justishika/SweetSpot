import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { useLike } from "@/context/LikeContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location, setLocation] = useLocation();
  const { getItemsCount } = useCart();
  const { likedDesserts } = useLike();

  const cartItemsCount = getItemsCount();
  const likedItemsCount = likedDesserts.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value.trim();
    if (searchQuery) {
      setLocation(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 transition-all duration-300 ${
      isScrolled ? "shadow-md" : "shadow-sm"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-primary text-2xl md:text-3xl font-poppins font-semibold">
                Sweet<span className="text-accent-dark">Spot</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={`font-poppins font-medium hover:text-primary transition-colors ${location === '/' ? 'text-primary' : 'text-neutral-900'}`}>
              Home
            </Link>
            <Link href="/catalog" className={`font-poppins font-medium hover:text-primary transition-colors ${location === '/catalog' ? 'text-primary' : 'text-neutral-900'}`}>
              Catalog
            </Link>
            <Link href="/about" className={`font-poppins font-medium hover:text-primary transition-colors ${location === '/about' ? 'text-primary' : 'text-neutral-900'}`}>
              About
            </Link>
            <Link href="/bakers" className={`font-poppins font-medium hover:text-primary transition-colors ${location === '/bakers' ? 'text-primary' : 'text-neutral-900'}`}>
              Bakers
            </Link>
          </nav>
          
          {/* Action Items */}
          <div className="flex items-center space-x-4">
            <button 
              className="text-neutral-600 hover:text-neutral-900 p-2 rounded-full hover:bg-neutral-100 transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <i className="ri-search-line text-xl"></i>
            </button>
            <Link 
              href="/favorites" 
              className="text-neutral-600 hover:text-neutral-900 p-2 rounded-full hover:bg-neutral-100 transition-colors relative"
            >
              <i className="ri-heart-line text-xl"></i>
              {likedItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {likedItemsCount}
                </span>
              )}
            </Link>
            <Link 
              href="/cart" 
              className="text-neutral-600 hover:text-neutral-900 p-2 rounded-full hover:bg-neutral-100 transition-colors relative"
            >
              <i className="ri-shopping-bag-line text-xl"></i>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden text-neutral-600 hover:text-neutral-900"
              onClick={toggleMobileMenu}
            >
              <i className="ri-menu-line text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
              <input
                type="search"
                name="search"
                placeholder="Search for desserts..."
                className="flex-1 px-4 py-2 rounded-full border border-neutral-200 focus:outline-none focus:border-primary"
                autoFocus
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-white shadow-md ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 py-5 space-y-3">
          <Link href="/" className="block font-poppins font-medium text-neutral-900 hover:text-primary py-2">
            Home
          </Link>
          <Link href="/catalog" className="block font-poppins font-medium text-neutral-900 hover:text-primary py-2">
            Catalog
          </Link>
          <Link href="/about" className={`block font-poppins font-medium py-2 hover:text-primary ${location === '/about' ? 'text-primary' : 'text-neutral-900'}`}>
            About
          </Link>
          <Link href="/bakers" className={`block font-poppins font-medium py-2 hover:text-primary ${location === '/bakers' ? 'text-primary' : 'text-neutral-900'}`}>
            Bakers
          </Link>
        </div>
      </div>
    </header>
  );
} 