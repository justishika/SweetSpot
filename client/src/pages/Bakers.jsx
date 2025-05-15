import { Link } from "wouter";

const bakers = [
  {
    id: 1,
    name: "Emily Chen",
    specialty: "Artisan Cakes",
    location: "San Francisco, CA",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1602351447937-745cb720612f?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1587248720327-8eb72564be1e?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop"
    ]
  },
  {
    id: 2,
    name: "Marcus Johnson",
    specialty: "French Pastries",
    location: "Portland, OR",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1505253304499-671c55fb57fe?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=300&h=300&fit=crop"
    ]
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    specialty: "Gluten-Free Desserts",
    location: "Austin, TX",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1612809076670-c93d4176e065?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1587248720327-8eb72564be1e?w=300&h=300&fit=crop"
    ]
  },
  {
    id: 4,
    name: "David Kim",
    specialty: "Korean-Inspired Desserts",
    location: "Seattle, WA",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1556910633-5099dc3971d6?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop"
    ]
  }
];

export default function Bakers() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-poppins font-bold mb-4">Meet Our Artisan Bakers</h1>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          SweetSpot connects you with talented local bakers who pour their heart and soul into
          every delicious creation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {bakers.map((baker) => (
          <div key={baker.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <img
                  src={baker.image}
                  alt={baker.name}
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <div>
                  <h2 className="text-xl font-poppins font-semibold">{baker.name}</h2>
                  <p className="text-primary font-medium">{baker.specialty}</p>
                  <div className="flex items-center mt-1">
                    <i className="ri-map-pin-line text-neutral-500 mr-1"></i>
                    <span className="text-sm text-neutral-500">{baker.location}</span>
                  </div>
                </div>
                <div className="ml-auto flex items-center">
                  <i className="ri-star-fill text-yellow-400 mr-1"></i>
                  <span className="font-medium">{baker.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {baker.gallery.map((image, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${baker.name}'s creation ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <Link
                href={`/baker/${baker.id}`}
                className="block text-center bg-primary hover:bg-primary-dark text-white font-poppins font-medium rounded-full px-6 py-2.5 mt-6 transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 