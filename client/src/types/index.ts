export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  galleryImages?: string[];
  category?: number;
  categoryName?: string;
  rating: number;
  reviewCount?: number;
  tags?: string[];
  baker?: {
    name: string;
    avatar: string;
  };
  occasions?: string[];
  flavors?: string[];
  sales: number;
}

export interface CartItem extends Product {
  quantity: number;
  options?: Record<string, string>;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  count?: number;
}

export interface Testimonial {
  id: number;
  name: string;
  initials: string;
  comment: string;
  rating: number;
  avatarBg: string;
}
