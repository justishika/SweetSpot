import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { getItemsCount } = useCart();

  const cartItemsCount = getItemsCount();

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

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 transition-all duration-300 ${
      isScrolled ? "shadow-md" : "shadow-sm"
    }`}>
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
            <Link href="#about" className="font-poppins font-medium text-neutral-900 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#bakers" className="font-poppins font-medium text-neutral-900 hover:text-primary transition-colors">
              Bakers
            </Link>
          </nav>
          
          {/* Action Items */}
          <div className="flex items-center space-x-4">
            <button className="text-neutral-600 hover:text-neutral-900 p-2 rounded-full hover:bg-neutral-100 transition-colors">
              <i className="ri-search-line text-xl"></i>
            </button>
            <button className="text-neutral-600 hover:text-neutral-900 p-2 rounded-full hover:bg-neutral-100 transition-colors">
              <i className="ri-heart-line text-xl"></i>
            </button>
            <Link href="/cart" className="text-neutral-600 hover:text-neutral-900 p-2 rounded-full hover:bg-neutral-100 transition-colors relative">
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
          <Link href="#about" className="block font-poppins font-medium text-neutral-900 hover:text-primary py-2">
            About
          </Link>
          <Link href="#bakers" className="block font-poppins font-medium text-neutral-900 hover:text-primary py-2">
            Bakers
          </Link>
        </div>
      </div>
    </header>
  );
}
