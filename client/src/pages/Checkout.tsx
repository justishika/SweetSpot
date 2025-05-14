import { useState } from "react";
import { useLocation } from "wouter";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

type PaymentMethod = "credit-card" | "paypal" | "apple-pay";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  
  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  
  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = 4.99;
  const tax = subtotal * 0.1; // 10% tax rate
  const total = subtotal + shipping + tax;
  
  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    setLocation("/cart");
    return null;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!firstName || !lastName || !email || !phone || !address || !city || !state || !zipCode) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (paymentMethod === "credit-card" && (!cardNumber || !expiryDate || !cvv || !nameOnCard)) {
      toast({
        title: "Error",
        description: "Please fill out all payment details",
        variant: "destructive"
      });
      return;
    }
    
    // Process order (would send to backend API in real app)
    toast({
      title: "Order Placed!",
      description: "Your order has been successfully placed. Thank you for shopping with SweetSpot!",
    });
    
    // Clear cart and redirect to success page
    clearCart();
    setLocation("/");
  };
  
  return (
    <div className="pt-8 fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-poppins font-semibold mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Checkout Form */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                    <h2 className="font-poppins font-medium text-lg">Delivery Information</h2>
                  </div>
                  
                  <div className="py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-900 mb-1">First Name *</label>
                        <input 
                          type="text" 
                          className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-900 mb-1">Last Name *</label>
                        <input 
                          type="text" 
                          className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-900 mb-1">Email Address *</label>
                      <input 
                        type="email" 
                        className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-900 mb-1">Phone Number *</label>
                      <input 
                        type="tel" 
                        className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-900 mb-1">Address *</label>
                      <input 
                        type="text" 
                        className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary mb-2" 
                        placeholder="Street Address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                      <input 
                        type="text" 
                        className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                        placeholder="Apt, Suite, Bldg (optional)" 
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-900 mb-1">City *</label>
                        <input 
                          type="text" 
                          className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-900 mb-1">State *</label>
                        <select 
                          className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          required
                        >
                          <option value="">Select State</option>
                          <option value="CA">California</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                          <option value="FL">Florida</option>
                          <option value="IL">Illinois</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-900 mb-1">ZIP Code *</label>
                        <input 
                          type="text" 
                          className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-900 mb-1">Delivery Instructions (optional)</label>
                      <textarea 
                        className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                        rows={2}
                        value={deliveryInstructions}
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 pb-6 border-t border-b border-neutral-200">
                    <h2 className="font-poppins font-medium text-lg">Payment Method</h2>
                  </div>
                  
                  <div className="py-6">
                    <div className="space-y-4">
                      <label className={`flex items-center p-3 border ${paymentMethod === "credit-card" ? "border-primary" : "border-neutral-200"} rounded-lg`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          className="h-4 w-4 text-primary focus:ring-primary"
                          checked={paymentMethod === "credit-card"}
                          onChange={() => setPaymentMethod("credit-card")}
                        />
                        <div className="ml-3">
                          <span className="block font-medium">Credit Card</span>
                          <span className="text-sm text-neutral-600">Pay with Visa, Mastercard, or American Express</span>
                        </div>
                        <div className="ml-auto flex space-x-2">
                          <i className="ri-visa-line text-lg"></i>
                          <i className="ri-mastercard-line text-lg"></i>
                          <i className="ri-bank-card-line text-lg"></i>
                        </div>
                      </label>
                      
                      <label className={`flex items-center p-3 border ${paymentMethod === "paypal" ? "border-primary" : "border-neutral-200"} rounded-lg`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          className="h-4 w-4 text-primary focus:ring-primary"
                          checked={paymentMethod === "paypal"}
                          onChange={() => setPaymentMethod("paypal")}
                        />
                        <div className="ml-3">
                          <span className="block font-medium">PayPal</span>
                          <span className="text-sm text-neutral-600">Pay with your PayPal account</span>
                        </div>
                        <i className="ri-paypal-line text-lg ml-auto"></i>
                      </label>
                      
                      <label className={`flex items-center p-3 border ${paymentMethod === "apple-pay" ? "border-primary" : "border-neutral-200"} rounded-lg`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          className="h-4 w-4 text-primary focus:ring-primary"
                          checked={paymentMethod === "apple-pay"}
                          onChange={() => setPaymentMethod("apple-pay")}
                        />
                        <div className="ml-3">
                          <span className="block font-medium">Apple Pay</span>
                          <span className="text-sm text-neutral-600">Pay with Apple Pay</span>
                        </div>
                        <i className="ri-apple-fill text-lg ml-auto"></i>
                      </label>
                    </div>
                    
                    {paymentMethod === "credit-card" && (
                      <div className="mt-6">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-neutral-900 mb-1">Card Number</label>
                          <input 
                            type="text" 
                            placeholder="1234 5678 9012 3456" 
                            className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-1">Expiration Date</label>
                            <input 
                              type="text" 
                              placeholder="MM/YY" 
                              className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-1">Security Code (CVV)</label>
                            <input 
                              type="text" 
                              placeholder="123" 
                              className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-neutral-900 mb-1">Name on Card</label>
                          <input 
                            type="text" 
                            className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                            value={nameOnCard}
                            onChange={(e) => setNameOnCard(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="font-poppins font-medium text-lg mb-4">Order Summary</h2>
                  
                  <div className="mb-4">
                    <div className="max-h-60 overflow-y-auto no-scrollbar">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex py-3 border-b border-neutral-200">
                          <div className="w-16 h-16 rounded-lg overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          
                          <div className="ml-3 flex-grow">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-sm">{item.name}</h3>
                              <span className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                            {item.options && (
                              <p className="text-neutral-600 text-xs">Size: {item.options.size} · Qty: {item.quantity}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-600 text-sm">Subtotal</span>
                      <span className="text-sm">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 text-sm">Shipping</span>
                      <span className="text-sm">{formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 text-sm">Tax</span>
                      <span className="text-sm">{formatPrice(tax)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-poppins font-medium">Total</span>
                      <span className="font-poppins font-semibold text-xl">{formatPrice(total)}</span>
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-poppins font-medium px-6 py-3 rounded-full transition-colors shadow-sm mb-4"
                  >
                    Complete Order
                  </button>
                  
                  <p className="text-xs text-neutral-600 text-center">
                    By completing your order, you agree to SweetSpot's <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
