export default function About() {
  return (
    <div className="pt-8 fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-poppins font-semibold mb-4">About SweetSpot</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Connecting dessert lovers with talented artisan bakers for truly special sweet experiences.
          </p>
        </div>
        
        {/* Our Story Section */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1606188074044-fcd750f6996a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="SweetSpot founders" 
                className="rounded-2xl shadow-md" 
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-poppins font-semibold mb-4">Our Story</h2>
              <p className="text-neutral-600 mb-4">
                SweetSpot began in 2022 when our founders, Emma and Lucas, realized how difficult it was to find truly special desserts for celebrations. 
                While mass-produced cakes were readily available, the incredible talent of local home bakers remained largely hidden and inaccessible.
              </p>
              <p className="text-neutral-600 mb-4">
                With backgrounds in food science and digital marketing, they set out to create a platform that would not only showcase the 
                incredible talent of artisan bakers but also make their creations accessible to dessert enthusiasts everywhere.
              </p>
              <p className="text-neutral-600">
                Today, SweetSpot connects thousands of dessert lovers with hundreds of talented bakers across the country, 
                making every celebration sweeter and supporting small culinary entrepreneurs.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Mission Section */}
        <div className="py-12 px-8 bg-gradient-to-r from-primary-light/30 to-accent-light/30 rounded-2xl mb-16">
          <h2 className="text-2xl font-poppins font-semibold mb-6 text-center">Our Mission</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-lg mb-8">
              "To sweeten people's lives by connecting passionate bakers with dessert lovers, supporting culinary creativity, 
              and making every celebration uniquely delicious."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-cake-3-line text-primary text-2xl"></i>
                </div>
                <h3 className="font-poppins font-medium mb-2">Support Local Bakers</h3>
                <p className="text-neutral-600 text-sm">
                  We help home-based and small bakery businesses reach new customers and grow their passion into a sustainable livelihood.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-heart-3-line text-secondary-dark text-2xl"></i>
                </div>
                <h3 className="font-poppins font-medium mb-2">Celebrate Diversity</h3>
                <p className="text-neutral-600 text-sm">
                  We showcase diverse baking traditions, flavor profiles, and dietary options to ensure everyone can find their perfect sweet treat.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-community-line text-accent-dark text-2xl"></i>
                </div>
                <h3 className="font-poppins font-medium mb-2">Build Community</h3>
                <p className="text-neutral-600 text-sm">
                  We foster connections between bakers and customers, creating a community united by a shared love for exceptional desserts.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-poppins font-semibold mb-8 text-center">How SweetSpot Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-poppins font-semibold">
                  1
                </div>
                <h3 className="font-poppins font-medium mb-4 mt-2">Browse & Discover</h3>
                <p className="text-neutral-600">
                  Explore our carefully curated selection of desserts from talented bakers in your area. 
                  Filter by occasion, dietary preferences, or flavor to find your perfect treat.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-poppins font-semibold">
                  2
                </div>
                <h3 className="font-poppins font-medium mb-4 mt-2">Customize & Order</h3>
                <p className="text-neutral-600">
                  Personalize your selection with custom messages, size options, or dietary modifications. 
                  Place your order securely through our platform with various payment options.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-poppins font-semibold">
                  3
                </div>
                <h3 className="font-poppins font-medium mb-4 mt-2">Enjoy & Share</h3>
                <p className="text-neutral-600">
                  Receive your freshly made dessert through local delivery or pickup. 
                  Enjoy your artisan creation and share your experience with our community.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-poppins font-semibold mb-8 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-64">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Emma Chen" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-poppins font-medium">Emma Chen</h3>
                <p className="text-primary text-sm">Co-Founder & CEO</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-64">
                <img 
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Lucas Wright" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-poppins font-medium">Lucas Wright</h3>
                <p className="text-primary text-sm">Co-Founder & COO</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-64">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Sarah Johnson" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-poppins font-medium">Sarah Johnson</h3>
                <p className="text-primary text-sm">Head of Baker Relations</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-64">
                <img 
                  src="https://images.unsplash.com/photo-1543132220-3ec99c6094dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Miguel Santos" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-poppins font-medium">Miguel Santos</h3>
                <p className="text-primary text-sm">Head of Technology</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Join Us CTA */}
        <div className="bg-gradient-to-r from-primary-light/30 to-accent-light/30 rounded-2xl p-8 md:p-12 text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-poppins font-semibold mb-4">Join the SweetSpot Family</h2>
          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
            Whether you're a talented baker looking to share your creations or a dessert enthusiast seeking something special,
            SweetSpot is your community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-primary hover:bg-primary-dark text-white font-poppins font-medium px-8 py-3 rounded-full transition-colors shadow-sm">
              Apply as a Baker
            </button>
            <button className="bg-white hover:bg-neutral-100 text-neutral-900 font-poppins font-medium px-8 py-3 rounded-full transition-colors shadow-sm border border-neutral-200">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}