import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getRandomBaker(): { name: string, avatar: string } {
  const bakerNames = [
    "Sweet Dreams Bakery",
    "Petit Gâteau",
    "Dough & Butter",
    "Emma's Bakery",
    "Sweet Nothings",
    "The French Corner",
    "Zest & Sugar",
    "Mindful Desserts",
    "Marco's Dolce"
  ];
  
  const randomIndex = Math.floor(Math.random() * bakerNames.length);
  const name = bakerNames[randomIndex];
  const avatarId = Math.floor(Math.random() * 100);
  const gender = Math.random() > 0.5 ? 'women' : 'men';
  
  return {
    name,
    avatar: `https://randomuser.me/api/portraits/${gender}/${avatarId}.jpg`
  };
}
