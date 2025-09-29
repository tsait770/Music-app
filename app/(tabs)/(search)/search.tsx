import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Search, MapPin, User, Play } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePlaces } from "@/providers/PlacesProvider";
import { PlaceCard } from "@/components/PlaceCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { AnimatedButton } from "@/components/AnimatedButton";
import { AnimatedLoading } from "@/components/AnimatedLoading";
import { categories } from "@/constants/categories";
import { Colors } from "@/constants/colors";
import { Typography, Spacing, BorderRadius } from "@/constants/theme";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { places, searchPlaces, isLoading } = usePlaces();
  const insets = useSafeAreaInsets();

  console.log('SearchScreen rendered with places:', places.length);

  const filteredPlaces = useMemo(() => {
    let filtered = places;
    
    if (searchQuery) {
      filtered = filtered.filter(place => 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(place => place.category === selectedCategory);
    }
    
    return filtered;
  }, [places, searchQuery, selectedCategory]);

  const handleSearch = useCallback(() => {
    searchPlaces(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory, searchPlaces]);

  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <View style={styles.logoIconInner} />
            </View>
            <Text style={styles.logoText}>Around</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }}
              style={styles.profileImage}
            />
            <View style={styles.profileIndicator} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Feel Alive"
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>
        
        <View style={styles.featuredSection}>
          <View style={styles.featuredGrid}>
            <TouchableOpacity style={[styles.featuredCard, styles.featuredCardLarge]} activeOpacity={0.8}>
              <LinearGradient
                colors={[Colors.accent + '80', Colors.accentGreen + '80']}
                style={styles.featuredGradient}
              >
                <Play size={24} color={Colors.white} style={styles.playIcon} />
                <Text style={styles.featuredTitle}>今日電台</Text>
                <Text style={styles.featuredSubtitle}>Personal Daily Radio</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <View style={styles.featuredColumn}>
              <TouchableOpacity style={[styles.featuredCard, styles.featuredCardSmall, { backgroundColor: Colors.accentRed }]} activeOpacity={0.8}>
                <View style={styles.chartIcon}>
                  <View style={styles.chartBar} />
                  <View style={[styles.chartBar, { height: 12 }]} />
                  <View style={[styles.chartBar, { height: 8 }]} />
                </View>
                <Text style={styles.featuredSmallTitle}>排行榜</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.featuredCard, styles.featuredCardSmall, { backgroundColor: Colors.accentOrange }]} activeOpacity={0.8}>
                <Play size={16} color={Colors.white} />
                <Text style={styles.featuredSmallTitle}>分類歌單</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>根據「One Day」推薦</Text>
        <TouchableOpacity>
          <Text style={styles.sectionMore}>›</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.recommendedSection}
        contentContainerStyle={styles.recommendedContent}
      >
        <TouchableOpacity style={styles.recommendedCard} activeOpacity={0.8}>
          <LinearGradient
            colors={[Colors.accent, Colors.accentGreen]}
            style={styles.recommendedGradient}
          >
            <Play size={20} color={Colors.white} />
            <Text style={styles.recommendedViews}>464.2w</Text>
          </LinearGradient>
          <Text style={styles.recommendedTitle}>跑步電音：點燃鬥志，壓力盡消</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.recommendedCard} activeOpacity={0.8}>
          <LinearGradient
            colors={[Colors.accentOrange, Colors.accentRed]}
            style={styles.recommendedGradient}
          >
            <Play size={20} color={Colors.white} />
            <Text style={styles.recommendedViews}>464.2w</Text>
          </LinearGradient>
          <Text style={styles.recommendedTitle}>民謠Live：一路風塵 也有詩和遠方</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>你的歌曲補給站</Text>
        <TouchableOpacity>
          <Text style={styles.sectionMore}>›</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.genreSection}
        contentContainerStyle={styles.genreContent}
      >
        <TouchableOpacity style={[styles.genreChip, styles.genreChipActive]} activeOpacity={0.8}>
          <Text style={[styles.genreText, styles.genreTextActive]}>KPOP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.genreChip} activeOpacity={0.8}>
          <Text style={styles.genreText}>Jazz Music</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.genreChip} activeOpacity={0.8}>
          <Text style={styles.genreText}>Rap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.genreChip} activeOpacity={0.8}>
          <Text style={styles.genreText}>Taylor Swift</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.songsList}>
          <TouchableOpacity style={styles.songItem} activeOpacity={0.7}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop' }}
              style={styles.songImage}
            />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>Late Night Feels</Text>
              <Text style={styles.songArtist}>Sam Feld</Text>
            </View>
            <View style={styles.songIndicator} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.songItem} activeOpacity={0.7}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=60&h=60&fit=crop' }}
              style={styles.songImage}
            />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>Midnight Vibes</Text>
              <Text style={styles.songArtist}>Luna Park</Text>
            </View>
            <View style={styles.songIndicator} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.songItem} activeOpacity={0.7}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=60&h=60&fit=crop' }}
              style={styles.songImage}
            />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>Electric Dreams</Text>
              <Text style={styles.songArtist}>Neon Lights</Text>
            </View>
            <View style={styles.songIndicator} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  logoIconInner: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: Colors.black,
  },
  logoText: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.xl,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.lg,
    marginLeft: Spacing.sm,
    color: Colors.text,
  },
  featuredSection: {
    marginBottom: Spacing.lg,
  },
  featuredGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  featuredCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredCardLarge: {
    flex: 2,
    height: 140,
    backgroundColor: Colors.card,
  },
  featuredColumn: {
    flex: 1,
    gap: Spacing.sm,
  },
  featuredCardSmall: {
    height: 66,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  featuredGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  playIcon: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
  },
  featuredTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.white,
    marginBottom: 2,
  },
  featuredSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: 'rgba(255,255,255,0.7)',
  },
  featuredSmallTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.white,
    marginLeft: Spacing.sm,
  },
  chartIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  chartBar: {
    width: 3,
    height: 16,
    backgroundColor: Colors.white,
    borderRadius: 1.5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
  },
  sectionMore: {
    fontSize: Typography.fontSize['2xl'],
    color: Colors.textMuted,
  },
  recommendedSection: {
    marginBottom: Spacing.xl,
  },
  recommendedContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  recommendedCard: {
    width: 280,
    marginRight: Spacing.md,
  },
  recommendedGradient: {
    height: 120,
    borderRadius: BorderRadius.lg,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  recommendedViews: {
    fontSize: Typography.fontSize.sm,
    color: Colors.white,
    fontWeight: Typography.fontWeight.medium,
  },
  recommendedTitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.sm,
  },
  genreSection: {
    marginBottom: Spacing.lg,
  },
  genreContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  genreChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.textMuted + '30',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  genreChipActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  genreText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textSecondary,
  },
  genreTextActive: {
    color: Colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Spacing['6xl'],
  },
  songsList: {
    paddingHorizontal: Spacing.lg,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
  },
  songImage: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text,
    marginBottom: 2,
  },
  songArtist: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
  },
  songIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.accent,
    marginLeft: 'auto',
  },
});