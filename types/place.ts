export interface Place {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  priceLevel: string;
  address: string;
  phone: string;
  website: string;
  hours: string;
  isOpen: boolean;
  distance: string;
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  reviews: {
    latest: Review[];
    worst: Review[];
  };
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}