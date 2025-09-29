import {
  LucideIcon,
  Utensils,
  Coffee,
  Landmark,
  ShoppingBag,
  Bed,
  Wine,
  Trees,
  Palette,
} from 'lucide-react-native';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

export const categories: Category[] = [
  { id: "restaurant", name: "餐廳", icon: Utensils },
  { id: "cafe", name: "咖啡廳", icon: Coffee },
  { id: "attraction", name: "景點", icon: Landmark },
  { id: "shopping", name: "購物", icon: ShoppingBag },
  { id: "hotel", name: "住宿", icon: Bed },
  { id: "bar", name: "酒吧", icon: Wine },
  { id: "park", name: "公園", icon: Trees },
  { id: "museum", name: "博物館", icon: Palette },
];