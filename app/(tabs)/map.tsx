import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { MapPin, Navigation, ArrowLeft, MoreVertical, Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePlaces } from "@/providers/PlacesProvider";
import { Colors } from "@/constants/colors";
import { Typography, Spacing, BorderRadius } from "@/constants/theme";



export default function MapScreen() {
  const { places } = usePlaces();
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
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Memories</Text>
              <Text style={styles.heroArtist}>Eli Lieb</Text>
              <Text style={styles.heroLyrics}>I found a love for me</Text>
              
              <View style={styles.playerControls}>
                <TouchableOpacity style={styles.controlButton}>
                  <Shuffle size={20} color={Colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <SkipBack size={24} color={Colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, styles.playButton]}>
                  <Play size={28} color={Colors.black} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <SkipForward size={24} color={Colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <MoreVertical size={20} color={Colors.white} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.progressContainer}>
                <Text style={styles.progressTime}>0:00</Text>
                <View style={styles.progressBar}>
                  <View style={styles.progressFill} />
                </View>
                <Text style={styles.progressTime}>3:00</Text>
              </View>
              
              <View style={styles.bottomControls}>
                <TouchableOpacity style={styles.bottomButton}>
                  <Volume2 size={20} color={Colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton}>
                  <MoreVertical size={20} color={Colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton}>
                  <Heart size={20} color={Colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton}>
                  <View style={styles.rotatedIcon}>
                    <MoreVertical size={20} color={Colors.white} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>

      <View style={styles.deviceSection}>
        <View style={styles.deviceCard}>
          <View style={styles.deviceHeader}>
            <View style={styles.deviceIcon}>
              <Volume2 size={16} color={Colors.white} />
            </View>
            <Text style={styles.deviceName}>Xiaomi Sound pro</Text>
            <TouchableOpacity style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.volumeSlider}>
            <View style={styles.volumeTrack}>
              <View style={styles.volumeFill} />
            </View>
          </View>
        </View>
        
        <View style={styles.deviceCard}>
          <View style={styles.deviceHeader}>
            <View style={styles.deviceIcon}>
              <Volume2 size={16} color={Colors.white} />
            </View>
            <Text style={styles.deviceName}>Xiaomi TV</Text>
            <TouchableOpacity style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.volumeSlider}>
            <View style={styles.volumeTrack}>
              <View style={[styles.volumeFill, styles.volumeFillPartial]} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 500,
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
    paddingBottom: Spacing['4xl'],
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  heroArtist: {
    fontSize: Typography.fontSize.lg,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  heroLyrics: {
    fontSize: Typography.fontSize.lg,
    color: Colors.white,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing['3xl'],
    textAlign: 'center',
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: Colors.white,
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing.xl,
  },
  progressTime: {
    fontSize: Typography.fontSize.sm,
    color: Colors.white,
    minWidth: 40,
    textAlign: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginHorizontal: Spacing.md,
  },
  progressFill: {
    width: '30%',
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  bottomButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceSection: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    gap: Spacing.lg,
  },
  deviceCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  deviceIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.textMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  deviceName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text,
    flex: 1,
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: Typography.fontSize.xl,
    color: Colors.textMuted,
    fontWeight: Typography.fontWeight.light,
  },
  volumeSlider: {
    width: '100%',
  },
  volumeTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },
  volumeFill: {
    width: '80%',
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
  volumeFillPartial: {
    width: '60%',
  },
  rotatedIcon: {
    transform: [{ rotate: '90deg' }],
  },
});