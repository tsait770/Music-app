import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { Star, MapPin, Clock } from "lucide-react-native";
import { Place } from "@/types/place";
import { AnimatedCard } from "@/components/AnimatedCard";



interface PlaceCardProps {
  place: Place;
  onPress: () => void;
  delay?: number;
}

export function PlaceCard({ place, onPress, delay = 0 }: PlaceCardProps) {
  const handlePress = () => {
    try {
      console.log('PlaceCard pressed for place:', place.id);
      onPress();
    } catch (error) {
      console.error('Error in PlaceCard onPress:', error);
    }
  };

  return (
    <AnimatedCard 
      onPress={handlePress} 
      variant="floating" 
      animationType="elastic"
      delay={delay}
      style={styles.cardContainer}
    >
      <Image source={{ uri: place.images[0] }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{place.name}</Text>
          <View style={styles.rating}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>{place.rating}</Text>
          </View>
        </View>
        
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <MapPin size={12} color="#666" />
            <Text style={styles.infoText} numberOfLines={1}>{place.address}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Clock size={12} color="#666" />
            <Text style={styles.infoText}>
              {place.isOpen ? "營業中" : "已打烊"} · {place.distance}
            </Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.category}>{place.category}</Text>
          <Text style={styles.price}>{place.priceLevel}</Text>
        </View>
      </View>
    </AnimatedCard>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 15,
    overflow: "hidden",
    padding: 0,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    flex: 1,
    marginRight: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFD700",
    marginLeft: 4,
  },
  info: {
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginLeft: 5,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    fontSize: 12,
    color: "#58c5cc",
    fontWeight: "500",
    backgroundColor: 'rgba(88, 197, 204, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  price: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "600",
  },
});