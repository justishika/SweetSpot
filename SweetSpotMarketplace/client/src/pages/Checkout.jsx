import { useState } from "react";
import { useLocation } from "wouter";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const PAYMENT_METHODS = {
  CREDIT_CARD: "credit-card",
  PAYPAL: "paypal",
  APPLE_PAY: "apple-pay"
};

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
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.CREDIT_CARD);
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
  
  const handleSubmit = (e) => {
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
    
    if (paymentMethod === PAYMENT_METHODS.CREDIT_CARD && (!cardNumber || !expiryDate || !cvv || !nameOnCard)) {
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
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Section */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-6">
                <div className="p-6">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                    <h2 className="font-poppins font-medium text-lg">Payment Method</h2>
                  </div>
                  
                  <div className="py-6">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <button
                        type="button"
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border ${
                          paymentMethod === PAYMENT_METHODS.CREDIT_CARD 
                            ? "border-primary bg-primary/5" 
                            : "border-neutral-200 hover:border-primary/50"
                        }`}
                        onClick={() => setPaymentMethod(PAYMENT_METHODS.CREDIT_CARD)}
                      >
                        <i className="ri-bank-card-line text-2xl mb-2"></i>
                        <span className="text-sm">Credit Card</span>
                      </button>
                      
                      <button
                        type="button"
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border ${
                          paymentMethod === PAYMENT_METHODS.PAYPAL 
                            ? "border-primary bg-primary/5" 
                            : "border-neutral-200 hover:border-primary/50"
                        }`}
                        onClick={() => setPaymentMethod(PAYMENT_METHODS.PAYPAL)}
                      >
                        <i className="ri-paypal-line text-2xl mb-2"></i>
                        <span className="text-sm">PayPal</span>
                      </button>
                      
                      <button
                        type="button"
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border ${
                          paymentMethod === PAYMENT_METHODS.APPLE_PAY 
                            ? "border-primary bg-primary/5" 
                            : "border-neutral-200 hover:border-primary/50"
                        }`}
                        onClick={() => setPaymentMethod(PAYMENT_METHODS.APPLE_PAY)}
                      >
                        <i className="ri-apple-fill text-2xl mb-2"></i>
                        <span className="text-sm">Apple Pay</span>
                      </button>
                    </div>
                    
                    {paymentMethod === PAYMENT_METHODS.CREDIT_CARD && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-900 mb-1">Card Number *</label>
                          <input 
                            type="text" 
                            className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-1">Expiry Date *</label>
                            <input 
                              type="text" 
                              className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-1">CVV *</label>
                            <input 
                              type="text" 
                              className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:border-primary" 
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-neutral-900 mb-1">Name on Card *</label>
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
                  
                  <button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-poppins font-medium px-6 py-3 rounded-full transition-colors shadow-sm mb-4"
                  >
                    Place Order
                  </button>
                  
                  <div className="flex justify-center space-x-3 text-neutral-600 text-sm">
                    <i className="ri-shield-check-line text-lg"></i>
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 