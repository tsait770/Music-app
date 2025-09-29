import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Heart, Play, MoreHorizontal } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePlaces } from "@/providers/PlacesProvider";
import { PlaceCard } from "@/components/PlaceCard";
import { Colors } from "@/constants/colors";
import { Typography, Spacing, BorderRadius } from "@/constants/theme";

export default function FavoritesScreen() {
  const { favorites } = usePlaces();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.headerContent}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Memories</Text>
              <Text style={styles.heroArtist}>Eli Lieb</Text>
              <Text style={styles.heroLyrics}>I found a love for me</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Heart size={24} color={Colors.white} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.playlistSection}>
          <Text style={styles.sectionTitle}>推薦榜單</Text>
          
          <View style={styles.playlistGrid}>
            <TouchableOpacity style={[styles.playlistCard, { backgroundColor: '#1e40af' }]}>
              <Play size={16} color={Colors.white} />
              <Text style={styles.playlistTitle}>Meon Top100</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.playlistCard, { backgroundColor: '#059669' }]}>
              <View style={styles.waveIcon}>
                <View style={styles.waveLine} />
                <View style={[styles.waveLine, { height: 8 }]} />
                <View style={[styles.waveLine, { height: 12 }]} />
              </View>
              <Text style={styles.playlistTitle}>Rap Top100</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.playlistCard, { backgroundColor: '#dc2626' }]}>
              <Text style={styles.plusIcon}>+</Text>
              <Text style={styles.playlistTitle}>INDIE Top100</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.officialSection}>
          <Text style={styles.sectionTitle}>官方榜單</Text>
          
          <View style={styles.officialList}>
            <TouchableOpacity style={styles.officialItem}>
              <LinearGradient
                colors={['#f97316', '#ea580c']}
                style={styles.officialImage}
              >
                <Play size={20} color={Colors.white} />
              </LinearGradient>
              <View style={styles.officialInfo}>
                <Text style={styles.officialTitle}>熱歌榜</Text>
                <Text style={styles.officialSubtitle}>1.Beach House</Text>
                <Text style={styles.officialSubtitle}>2.High School in Jakarta</Text>
                <Text style={styles.officialSubtitle}>3.Toxic Energy</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.officialItem}>
              <LinearGradient
                colors={['#10b981', '#059669']}
                style={styles.officialImage}
              >
                <Play size={20} color={Colors.white} />
              </LinearGradient>
              <View style={styles.officialInfo}>
                <Text style={styles.officialTitle}>新歌榜</Text>
                <Text style={styles.officialSubtitle}>1.Beach House</Text>
                <Text style={styles.officialSubtitle}>2.High School in Jakarta</Text>
                <Text style={styles.officialSubtitle}>3.Toxic Energy</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.officialItem}>
              <LinearGradient
                colors={['#8b5cf6', '#7c3aed']}
                style={styles.officialImage}
              >
                <Play size={20} color={Colors.white} />
              </LinearGradient>
              <View style={styles.officialInfo}>
                <Text style={styles.officialTitle}>原創榜</Text>
                <Text style={styles.officialSubtitle}>1.Beach House</Text>
                <Text style={styles.officialSubtitle}>2.High School in Jakarta</Text>
                <Text style={styles.officialSubtitle}>3.Toxic Energy</Text>
              </View>
            </TouchableOpacity>
          </View>
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
    height: 400,
    position: 'relative',
  },
  headerContent: {
    flex: 1,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroTitle: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  heroArtist: {
    fontSize: Typography.fontSize.lg,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: Spacing.lg,
  },
  heroLyrics: {
    fontSize: Typography.fontSize.lg,
    color: Colors.white,
    fontWeight: Typography.fontWeight.medium,
  },
  favoriteButton: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingBottom: Spacing['6xl'],
  },
  playlistSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  playlistGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  playlistCard: {
    flex: 1,
    height: 80,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    justifyContent: 'space-between',
  },
  playlistTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.white,
  },
  waveIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  waveLine: {
    width: 2,
    height: 16,
    backgroundColor: Colors.white,
    borderRadius: 1,
  },
  plusIcon: {
    fontSize: Typography.fontSize.xl,
    color: Colors.white,
    fontWeight: Typography.fontWeight.bold,
  },
  officialSection: {
    paddingHorizontal: Spacing.lg,
  },
  officialList: {
    gap: Spacing.lg,
  },
  officialItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  officialImage: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  officialInfo: {
    flex: 1,
  },
  officialTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  officialSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
    marginBottom: 2,
  },
});