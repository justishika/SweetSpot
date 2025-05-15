import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getRandomBaker() {
  const bakers = [
    {
      name: "Emily Chen",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      rating: 4.9,
      reviewCount: 128,
      specialties: ["Cakes", "Pastries"]
    },
    {
      name: "Marcus Johnson",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      rating: 4.8,
      reviewCount: 96,
      specialties: ["Breads", "Cookies"]
    },
    {
      name: "Sofia Rodriguez",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      rating: 4.9,
      reviewCount: 156,
      specialties: ["Cupcakes", "Custom Designs"]
    }
  ];
  
  return bakers[Math.floor(Math.random() * bakers.length)];
} 