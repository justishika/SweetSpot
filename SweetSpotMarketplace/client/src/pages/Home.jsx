import { Link } from "wouter";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { testimonials } from "@/data/testimonials";

export default function Home() {
  // Get featured products (first 3)
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/30 to-white pt-10 md:pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold leading-tight text-neutral-900 mb-4">
                Sweet Moments, <span className="text-primary">Delivered</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8 font-quicksand">
                Discover artisan desserts made with love by local bakers. From custom cakes to vegan treats, we connect dessert lovers with talented creators.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <Link href="/catalog" className="bg-primary hover:bg-primary-dark text-white font-poppins font-medium px-8 py-3 rounded-full transition-colors shadow-sm text-center">
                  Browse Desserts
                </Link>
                <Link href="/bakers" className="bg-white hover:bg-neutral-100 text-neutral-900 font-poppins font-medium px-8 py-3 rounded-full transition-colors shadow-sm border border-neutral-200 text-center">
                  Meet Our Bakers
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 relative">
              <img 
                src="https://images.unsplash.com/photo-1488477304112-4944851de03d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80" 
                alt="Collection of artisan desserts" 
                className="rounded-full w-full max-w-lg mx-auto shadow-xl" 
              />
              
              {/* Floating elements */}
              <div className="absolute top-1/4 -left-6 md:-left-12 bg-white p-2 rounded-lg shadow-sm rotate-6 hidden md:block">
                <div className="flex items-center space-x-2">
                  <i className="ri-star-fill text-yellow-400"></i>
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
              </div>
              
              <div className="absolute bottom-1/4 -right-6 md:-right-12 bg-white p-2 rounded-lg shadow-sm -rotate-6 hidden md:block">
                <div className="flex items-center space-x-2">
                  <i className="ri-heart-fill text-red-400"></i>
                  <span className="text-sm font-medium">500+ Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative wave element */}
        <div className="absolute -bottom-2 left-0 right-0 h-16">
          <svg width="100%" height="100%" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <g fill="#ffffff">
              <path d="M1280 0l-262.1 116.26a73.29 73.29 0 01-39.09 6L0 0v140h1280z"></path>
            </g>
          </svg>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-poppins font-semibold text-center mb-8">Browse By Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Desserts */}
      <section className="py-12 md:py-16 bg-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-3xl font-poppins font-semibold">Featured Desserts</h2>
            <Link href="/catalog" className="text-primary hover:text-primary-dark font-poppins font-medium flex items-center">
              View All <i className="ri-arrow-right-line ml-1"></i>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} featured />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-poppins font-semibold text-center mb-2">Customer Love</h2>
          <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">See what our happy customers have to say about their SweetSpot experience.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Join as Baker CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-light/40 to-accent-light/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-poppins font-semibold mb-4">Share Your Sweet Creations</h2>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              Are you a talented baker? Join our marketplace and reach dessert lovers in your area. Turn your passion into profit.
            </p>
            <Link href="/bakers" className="inline-block bg-primary hover:bg-primary-dark text-white font-poppins font-medium px-8 py-3 rounded-full transition-colors shadow-sm">
              Become a Baker
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 