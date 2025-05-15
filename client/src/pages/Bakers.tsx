import { useState } from "react";
import { Link } from "wouter";
import { getRandomBaker } from "@/lib/utils";

interface Baker {
  id: number;
  name: string;
  avatar: string;
  specialty: string;
  location: string;
  rating: number;
  description: string;
  products: {
    id: number;
    name: string;
    image: string;
  }[];
}

// Generate sample baker data
const generateBakers = (): Baker[] => {
  const bakerSpecialties = [
    "Artisan Cakes",
    "French Pastries",
    "Vegan Treats",
    "Gluten-Free Desserts",
    "Chocolate Confections",
    "Wedding Cakes",
    "Seasonal Pies",
    "Cookies & Macarons"
  ];
  
  const bakerLocations = [
    "San Francisco, CA",
    "Portland, OR",
    "Brooklyn, NY",
    "Austin, TX",
    "Chicago, IL",
    "Seattle, WA",
    "New Orleans, LA",
    "Denver, CO"
  ];
  
  const bakerDescriptions = [
    "Specializing in custom celebration cakes that taste as amazing as they look. Each cake is baked from scratch using premium ingredients.",
    "Creating authentic French pastries using traditional techniques learned during my training in Paris. I focus on seasonal ingredients and bold flavors.",
    "Passionate about creating desserts that everyone can enjoy, regardless of dietary restrictions. My vegan treats will change how you think about plant-based baking.",
    "After discovering my own gluten sensitivity, I dedicated myself to creating gluten-free desserts that never compromise on taste or texture.",
    "A chocolate enthusiast with a dedication to sourcing ethically produced cacao. Every truffle, cake, and cookie celebrates the complex flavors of fine chocolate.",
    "With over 15 years of experience creating wedding cakes, I work closely with couples to design the perfect centerpiece for their special day.",
    "My grandmother's pie recipes inspired my baking journey. I create seasonal pies that honor tradition while incorporating innovative flavor combinations.",
    "Precision and patience are key to my cookie creations. Each batch is meticulously crafted for the perfect texture and flavor balance."
  ];
  
  // Sample product images from existing data
  const productImages = [
    "https://images.unsplash.com/photo-1605807646983-377bc5a76493?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80",
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80",
    "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80",
    "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80",
    "https://pixabay.com/get/g2983913ad9b80c522c6417f618e783c7764fefb0d3a1439b0ca19049183f187f0f9c8f3c80ffb13e031abb1c0612039710b301013cdc90ba5b3ca5a24f4d59b5_1280.jpg",
    "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80"
  ];
  
  return Array.from({ length: 8 }, (_, i) => {
    const baker = getRandomBaker();
    return {
      id: i + 1,
      name: baker.name,
      avatar: baker.avatar,
      specialty: bakerSpecialties[i],
      location: bakerLocations[i],
      rating: 4.5 + Math.random() * 0.5,
      description: bakerDescriptions[i],
      products: Array.from({ length: 3 + Math.floor(Math.random() * 3) }, (_, j) => ({
        id: i * 10 + j + 1,
        name: ["Chocolate Cake", "Macarons", "Apple Pie", "Tiramisu", "Brownies", "Cupcakes"][Math.floor(Math.random() * 6)],
        image: productImages[Math.floor(Math.random() * productImages.length)]
      }))
    };
  });
};

export default function Bakers() {
  const [bakers] = useState<Baker[]>(generateBakers());
  const [selectedBaker, setSelectedBaker] = useState<Baker | null>(null);
  
  return (
    <div className="pt-8 fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-poppins font-semibold mb-4">Meet Our Artisan Bakers</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            SweetSpot connects you with talented local bakers who pour their heart and soul into every delicious creation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {bakers.map(baker => (
            <div 
              key={baker.id} 
              className="bg-white rounded-2xl shadow-sm overflow-hidden card-hover cursor-pointer"
              onClick={() => setSelectedBaker(baker)}
            >
              <div className="relative">
                <div className="h-40 bg-gradient-to-r from-primary-light/30 to-accent-light/30 flex items-center justify-center">
                  <img 
                    src={baker.avatar} 
                    alt={baker.name} 
                    className="w-24 h-24 rounded-full border-4 border-white shadow-sm object-cover" 
                  />
                </div>
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <i className="ri-star-fill text-yellow-400 mr-1 text-sm"></i>
                    <span className="text-sm font-medium">{baker.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <div className="text-center mb-3">
                  <h3 className="font-poppins font-medium text-lg">{baker.name}</h3>
                  <p className="text-primary text-sm">{baker.specialty}</p>
                  <p className="text-neutral-600 text-xs mt-1">
                    <i className="ri-map-pin-line mr-1"></i>
                    {baker.location}
                  </p>
                </div>
                
                <div className="flex justify-center space-x-2 mt-4">
                  {baker.products.slice(0, 3).map((product, idx) => (
                    <div key={idx} className="w-12 h-12 rounded-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Selected Baker Detail Modal */}
        {selectedBaker && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full max-h-screen overflow-auto">
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-primary-light/40 to-accent-light/40"></div>
                <button 
                  className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white"
                  onClick={() => setSelectedBaker(null)}
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
                <div className="absolute -bottom-16 left-8">
                  <img 
                    src={selectedBaker.avatar} 
                    alt={selectedBaker.name} 
                    className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover" 
                  />
                </div>
              </div>
              
              <div className="pt-20 px-8 pb-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="font-poppins font-semibold text-2xl">{selectedBaker.name}</h2>
                    <p className="text-primary">{selectedBaker.specialty}</p>
                    <p className="text-neutral-600 text-sm mt-1">
                      <i className="ri-map-pin-line mr-1"></i>
                      {selectedBaker.location}
                    </p>
                  </div>
                  <div className="flex items-center bg-white px-3 py-1 rounded-lg shadow-sm">
                    <i className="ri-star-fill text-yellow-400 mr-1"></i>
                    <span className="font-medium">{selectedBaker.rating.toFixed(1)}</span>
                    <span className="text-neutral-600 text-sm ml-1">(48 reviews)</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-poppins font-medium text-lg mb-3">About</h3>
                  <p className="text-neutral-600">{selectedBaker.description}</p>
                </div>
                
                <div>
                  <h3 className="font-poppins font-medium text-lg mb-4">Popular Creations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedBaker.products.map((product, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-40 object-cover" 
                        />
                        <div className="p-3">
                          <h4 className="font-poppins font-medium">{product.name}</h4>
                          <Link href={`/catalog`} className="text-primary text-sm hover:underline">
                            View in catalog
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center mt-8">
                  <button className="bg-primary hover:bg-primary-dark text-white font-poppins font-medium px-6 py-3 rounded-full transition-colors shadow-sm">
                    Contact Baker
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Join as a Baker CTA */}
        <div className="bg-gradient-to-r from-primary-light/30 to-accent-light/30 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-poppins font-semibold mb-4">Are You a Talented Baker?</h2>
          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
            Join SweetSpot as a verified baker and share your delicious creations with dessert lovers in your area. Turn your passion into profit!
          </p>
          <button className="bg-primary hover:bg-primary-dark text-white font-poppins font-medium px-8 py-3 rounded-full transition-colors shadow-sm">
            Apply to Join
          </button>
        </div>
      </div>
    </div>
  );
}