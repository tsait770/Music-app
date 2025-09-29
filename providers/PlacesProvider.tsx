import { useState, useCallback, useEffect, useMemo } from "react";
import createContextHook from "@nkzw/create-context-hook";
import { mockPlaces } from "@/mocks/places";
import { Place } from "@/types/place";

interface PlacesContextType {
  places: Place[];
  favorites: Place[];
  isLoading: boolean;
  searchPlaces: (query: string, category: string | null) => void;
  toggleFavorite: (placeId: string) => void;
  isFavorite: (placeId: string) => boolean;
}

export const [PlacesProvider, usePlaces] = createContextHook<PlacesContextType>(() => {
  const [places, setPlaces] = useState<Place[]>(() => {
    try {
      console.log('Initializing places with mock data:', mockPlaces.length);
      return mockPlaces;
    } catch (error) {
      console.error('Error initializing places:', error);
      return [];
    }
  });
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      console.log("Loading favorites...");
      // Simulate loading from storage - no actual JSON parsing yet
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const saveFavorites = async (favoriteIds: string[]) => {
    try {
      console.log("Saving favorites:", favoriteIds);
      // Simulate saving to storage - no actual JSON parsing yet
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const searchPlaces = useCallback((query: string, category: string | null) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filtered = mockPlaces;
      
      if (query) {
        filtered = filtered.filter(place =>
          place.name.toLowerCase().includes(query.toLowerCase()) ||
          place.address.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      if (category) {
        filtered = filtered.filter(place => place.category === category);
      }
      
      setPlaces(filtered);
      setIsLoading(false);
    }, 500);
  }, []);

  const toggleFavorite = useCallback((placeId: string) => {
    const place = mockPlaces.find(p => p.id === placeId);
    if (!place) return;

    setFavorites(prev => {
      const isFav = prev.some(p => p.id === placeId);
      let newFavorites: Place[];
      
      if (isFav) {
        newFavorites = prev.filter(p => p.id !== placeId);
      } else {
        newFavorites = [...prev, place];
      }
      
      saveFavorites(newFavorites.map(p => p.id));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((placeId: string) => {
    return favorites.some(p => p.id === placeId);
  }, [favorites]);

  return useMemo(() => ({
    places,
    favorites,
    isLoading,
    searchPlaces,
    toggleFavorite,
    isFavorite,
  }), [places, favorites, isLoading, searchPlaces, toggleFavorite, isFavorite]);
});