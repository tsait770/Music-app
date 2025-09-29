import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
} from "react-native";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  Navigation,
  Heart,
  Share2,
  ThumbsDown,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { usePlaces } from "@/providers/PlacesProvider";



export default function PlaceDetailScreen() {
  const { id } = useLocalSearchParams();
  const { places, toggleFavorite, isFavorite } = usePlaces();

  const place = useMemo(() => {
    const placeId = Array.isArray(id) ? id[0] : id;
    return places.find(p => p.id === placeId);
  }, [places, id]);

  if (!place) {
    return (
      <View style={styles.container}>
        <Text>地點不存在</Text>
      </View>
    );
  }

  const handleNavigation = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${place.name}@${place.coordinates.lat},${place.coordinates.lng}`,
      android: `geo:0,0?q=${place.coordinates.lat},${place.coordinates.lng}(${place.name})`,
      default: `https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}`,
    });
    
    if (url) {
      Linking.openURL(url);
    }
  };

  const handleCall = () => {
    Linking.openURL(`tel:${place.phone}`);
  };

  const handleWebsite = () => {
    Linking.openURL(place.website);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: place.images[0] }} style={styles.mainImage} />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.6)"]}
            style={styles.imageOverlay}
          />
          
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#333" />
            </TouchableOpacity>
            
            <View style={styles.rightButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => toggleFavorite(place.id)}
              >
                <Heart
                  size={24}
                  color={isFavorite(place.id) ? "#FF385C" : "#333"}
                  fill={isFavorite(place.id) ? "#FF385C" : "none"}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Share2 size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{place.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={20} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>{place.rating}</Text>
              <Text style={styles.reviewCount}>({place.reviewCount} 則評論)</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <TouchableOpacity style={styles.infoItem} onPress={handleNavigation}>
              <MapPin size={18} color="#666" />
              <Text style={styles.infoText}>{place.address}</Text>
            </TouchableOpacity>
            
            <View style={styles.infoItem}>
              <Clock size={18} color="#666" />
              <Text style={styles.infoText}>
                {place.isOpen ? "營業中" : "已打烊"} · {place.hours}
              </Text>
            </View>
            
            {place.phone && (
              <TouchableOpacity style={styles.infoItem} onPress={handleCall}>
                <Phone size={18} color="#666" />
                <Text style={[styles.infoText, styles.linkText]}>{place.phone}</Text>
              </TouchableOpacity>
            )}
            
            {place.website && (
              <TouchableOpacity style={styles.infoItem} onPress={handleWebsite}>
                <Globe size={18} color="#666" />
                <Text style={[styles.infoText, styles.linkText]}>查看網站</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleNavigation}>
              <Navigation size={20} color="#fff" />
              <Text style={styles.primaryButtonText}>導航</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton} onPress={handleCall}>
              <Phone size={20} color="#FF385C" />
              <Text style={styles.secondaryButtonText}>致電</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>精選評論</Text>
            
            <View style={styles.reviewsContainer}>
              <Text style={styles.reviewCategory}>最新評論</Text>
              {place.reviews.latest.map((review, index) => (
                <View key={`latest-${index}`} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewAuthor}>{review.author}</Text>
                    <View style={styles.reviewRating}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={`latest-${review.author}-${i}`}
                          size={12}
                          color="#FFD700"
                          fill={i < review.rating ? "#FFD700" : "none"}
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewText}>{review.text}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              ))}
              
              {place.reviews.worst.length > 0 && (
                <>
                  <Text style={styles.reviewCategory}>
                    <ThumbsDown size={16} color="#666" /> 最差評論
                  </Text>
                  {place.reviews.worst.map((review, index) => (
                    <View key={`worst-${index}`} style={styles.reviewCard}>
                      <View style={styles.reviewHeader}>
                        <Text style={styles.reviewAuthor}>{review.author}</Text>
                        <View style={styles.reviewRating}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={`worst-${review.author}-${i}`}
                              size={12}
                              color="#FFD700"
                              fill={i < review.rating ? "#FFD700" : "none"}
                            />
                          ))}
                        </View>
                      </View>
                      <Text style={styles.reviewText}>{review.text}</Text>
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                  ))}
                </>
              )}
            </View>
            
            <Text style={styles.attribution}>評論來源：Google</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    height: 300,
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  headerButtons: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  rightButtons: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
    flex: 1,
  },
  linkText: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  actionButtonsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
  },
  primaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF385C",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF385C",
    gap: 8,
  },
  secondaryButtonText: {
    color: "#FF385C",
    fontSize: 16,
    fontWeight: "600",
  },
  reviewsSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  reviewsContainer: {
    gap: 10,
  },
  reviewCategory: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginTop: 10,
    marginBottom: 5,
  },
  reviewCard: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  reviewRating: {
    flexDirection: "row",
  },
  reviewText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: "#999",
  },
  attribution: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});