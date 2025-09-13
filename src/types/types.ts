export type AppState = {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  restaurants: any[];
  setRestaurants: React.Dispatch<React.SetStateAction<any[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export type Restaurant = {
  place_id: string;
  name: string;
  vicinity?: string;
  rating?: number;
  icon?: string;
};

export type RestaurantDetails = {
  name: string;
  formatted_address: string;
  geometry: { location: { lat: number; lng: number } };
  opening_hours?: { open_now?: boolean; weekday_text?: string[] };
  website?: string;
  rating?: number;
  user_ratings_total?: number;
  formatted_phone_number?: string;
  international_phone_number?: string;
  price_level?: number;
  types?: string[];
  editorial_summary?: { overview: string };
  reviews?: { author_name: string; rating: number; text: string }[];
  delivery?: boolean;
  dine_in?: boolean;
  reservable?: boolean;
  serves_beer?: boolean;
  serves_wine?: boolean;
  serves_breakfast?: boolean;
  serves_brunch?: boolean;
  serves_lunch?: boolean;
  serves_dinner?: boolean;
};
