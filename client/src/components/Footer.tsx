import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-primary text-2xl font-poppins font-semibold">
                Sweet<span className="text-accent-dark">Spot</span>
              </span>
            </div>
            <p className="text-neutral-600 mb-6">
              Connecting dessert lovers with talented artisan bakers in your area. Discover handcrafted treats made with love.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                <i className="ri-facebook-circle-line text-xl"></i>
              </a>
              <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                <i className="ri-twitter-line text-xl"></i>
              </a>
              <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                <i className="ri-pinterest-line text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-poppins font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-neutral-600 hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/catalog" className="text-neutral-600 hover:text-primary transition-colors">Catalog</Link></li>
              <li><Link href="/about" className="text-neutral-600 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/bakers" className="text-neutral-600 hover:text-primary transition-colors">Our Bakers</Link></li>
              <li><a href="#blog" className="text-neutral-600 hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-poppins font-medium text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#contact" className="text-neutral-600 hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#faq" className="text-neutral-600 hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#shipping" className="text-neutral-600 hover:text-primary transition-colors">Shipping Policy</a></li>
              <li><a href="#returns" className="text-neutral-600 hover:text-primary transition-colors">Returns & Refunds</a></li>
              <li><a href="#privacy" className="text-neutral-600 hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-poppins font-medium text-lg mb-4">Newsletter</h3>
            <p className="text-neutral-600 mb-4">
              Join our newsletter for sweet deals and updates on new treats!
            </p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow border border-neutral-200 rounded-l-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                />
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-dark text-white font-poppins font-medium px-4 py-2 rounded-r-lg transition-colors"
                >
                  <i className="ri-send-plane-fill"></i>
                </button>
              </div>
            </form>
            <p className="text-xs text-neutral-600">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from SweetSpot.
            </p>
          </div>
        </div>
        
        <div className="border-t border-neutral-200 mt-12 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-neutral-600 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SweetSpot. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#terms" className="text-neutral-600 hover:text-primary transition-colors text-sm">Terms of Service</a>
            <a href="#privacy" className="text-neutral-600 hover:text-primary transition-colors text-sm">Privacy Policy</a>
            <a href="#cookies" className="text-neutral-600 hover:text-primary transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
