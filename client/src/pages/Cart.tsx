import { useState } from "react";
import { Link } from "wouter";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  
  const subtotal = getCartTotal();
  const shipping = 4.99;
  const tax = subtotal * 0.1; // 10% tax rate
  const total = subtotal + shipping + tax;
  
  const handleApplyCoupon = () => {
    // Would implement coupon logic here
    alert(`Coupon ${couponCode} applied!`);
    setCouponCode("");
  };
  
  return (
    <div className="pt-8 fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-poppins font-semibold mb-8">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
                    <h2 className="font-poppins font-medium text-lg">Shopping Cart ({cartItems.length} items)</h2>
                    <button 
                      className="text-neutral-600 hover:text-primary text-sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to clear your cart?")) {
                          cartItems.forEach(item => removeFromCart(item.id));
                        }
                      }}
                    >
                      Clear Cart
                    </button>
                  </div>
                  
                  {cartItems.map(item => (
                    <div key={item.id} className="py-4 border-b border-neutral-200">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-24 sm:h-24 rounded-xl overflow-hidden mb-4 sm:mb-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        
                        <div className="sm:ml-4 flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-poppins font-medium">{item.name}</h3>
                              {item.options && (
                                <p className="text-neutral-600 text-sm">
                                  Size: {item.options.size} · Frosting: {item.options.frosting}
                                </p>
                              )}
                              {item.options && item.options.message && item.options.message !== "None" && (
                                <p className="text-primary text-sm">Special Request: "{item.options.message}"</p>
                              )}
                              <div className="mt-2 text-neutral-600 text-sm">
                                <span className="mr-3">{formatPrice(item.price)}</span>
                                <span className="text-neutral-900">× {item.quantity}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end">
                              <span className="font-poppins font-medium">{formatPrice(item.price * item.quantity)}</span>
                              <div className="flex space-x-4 mt-2">
                                <button className="text-neutral-600 hover:text-primary text-sm">Edit</button>
                                <button 
                                  className="text-neutral-600 hover:text-primary text-sm"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-neutral-100 p-6">
                  <div className="flex justify-between items-center">
                    <input 
                      type="text" 
                      placeholder="Enter coupon code" 
                      className="border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary text-sm"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button 
                      className="bg-white hover:bg-neutral-100 text-neutral-900 font-poppins font-medium px-4 py-2 rounded-lg transition-colors shadow-sm border border-neutral-200 text-sm ml-2"
                      onClick={handleApplyCoupon}
                      disabled={!couponCode}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-6">
                <Link href="/catalog" className="text-primary hover:text-primary-dark font-poppins font-medium flex items-center">
                  <i className="ri-arrow-left-line mr-1"></i> Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="font-poppins font-medium text-lg mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Shipping</span>
                      <span>{formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-poppins font-medium">Total</span>
                      <span className="font-poppins font-semibold text-xl">{formatPrice(total)}</span>
                    </div>
                  </div>
                  
                  <Link href="/checkout" className="w-full bg-primary hover:bg-primary-dark text-white font-poppins font-medium px-6 py-3 rounded-full transition-colors shadow-sm mb-4 block text-center">
                    Proceed to Checkout
                  </Link>
                  
                  <div className="flex justify-center space-x-3 text-neutral-600 text-sm">
                    <i className="ri-visa-line text-lg"></i>
                    <i className="ri-mastercard-line text-lg"></i>
                    <i className="ri-paypal-line text-lg"></i>
                    <i className="ri-apple-fill text-lg"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
            <i className="ri-shopping-cart-line text-6xl text-neutral-300 mb-4"></i>
            <h2 className="text-2xl font-poppins font-semibold mb-2">Your cart is empty</h2>
            <p className="text-neutral-600 mb-6">Looks like you haven't added any treats to your cart yet.</p>
            <Link href="/catalog" className="bg-primary hover:bg-primary-dark text-white font-poppins font-medium px-6 py-3 rounded-full transition-colors shadow-sm">
              Discover Desserts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
