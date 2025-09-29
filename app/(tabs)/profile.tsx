import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  User,
  Settings,
  CreditCard,
  Globe,
  LogOut,
  ChevronRight,
  Star,
  Activity,
  Headphones,
  Clock,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography, Spacing, BorderRadius } from "@/constants/theme";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  
  const workoutData = [
    { type: 'Running', icon: Activity, color: Colors.accent, time: '05:30 PM - 06:28 PM' },
    { type: 'Swimming', icon: Activity, color: Colors.accentOrange, time: '07:00 AM - 08:00 AM' },
    { type: 'Gymnastics', icon: Activity, color: Colors.accentRed, time: '06:00 PM - 07:30 PM' },
  ];
  
  const healthStats = [
    { label: 'Avg Blood Pressure', value: '107', unit: 'mg/dL', color: Colors.textMuted },
    { label: 'Active running time', value: '58', unit: 'minutes', color: '#a3e635' },
    { label: 'Heartbeat rate', value: '176', unit: 'beats/min', color: Colors.textMuted },
    { label: 'Running distance', value: '3.24', unit: 'km', color: Colors.textMuted },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.headerContent}>
          <View style={styles.runningCard}>
            <LinearGradient
              colors={['rgba(163, 230, 53, 0.2)', 'rgba(163, 230, 53, 0.1)']}
              style={styles.runningGradient}
            >
              <View style={styles.runningHeader}>
                <View style={styles.runningIcon}>
                  <Activity size={16} color={Colors.background} />
                </View>
                <Text style={styles.runningTitle}>Running</Text>
                <Text style={styles.runningTime}>05:30 PM - 06:28 PM</Text>
              </View>
              
              <View style={styles.statsGrid}>
                {healthStats.map((stat, index) => (
                  <View key={index} style={[styles.statCard, index % 2 === 0 ? styles.statCardLeft : styles.statCardRight]}>
                    <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                    <Text style={styles.statUnit}>{stat.unit}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.workoutSection}>
          <Text style={styles.sectionTitle}>Workout Activities</Text>
          <View style={styles.workoutList}>
            {workoutData.map((workout, index) => (
              <TouchableOpacity key={index} style={styles.workoutItem}>
                <View style={[styles.workoutIcon, { backgroundColor: workout.color }]}>
                  <workout.icon size={16} color={Colors.white} />
                </View>
                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutName}>{workout.type}</Text>
                  <Text style={styles.workoutTime}>{workout.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.musicSection}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <View style={styles.musicList}>
            <TouchableOpacity style={styles.musicItem}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop' }}
                style={styles.musicImage}
              />
              <View style={styles.musicInfo}>
                <Text style={styles.musicTitle}>Gimme Love</Text>
                <Text style={styles.musicArtist}>Joji</Text>
              </View>
              <View style={styles.musicControls}>
                <TouchableOpacity style={styles.musicButton}>
                  <ChevronRight size={16} color={Colors.textMuted} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.musicButton}>
                  <Headphones size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.musicItem}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=60&h=60&fit=crop' }}
                style={styles.musicImage}
              />
              <View style={styles.musicInfo}>
                <Text style={styles.musicTitle}>Midnight City</Text>
                <Text style={styles.musicArtist}>M83</Text>
              </View>
              <View style={styles.musicControls}>
                <TouchableOpacity style={styles.musicButton}>
                  <ChevronRight size={16} color={Colors.textMuted} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.musicButton}>
                  <Headphones size={16} color={Colors.textMuted} />
                </TouchableOpacity>
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
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  headerContent: {
    flex: 1,
  },
  runningCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginTop: Spacing.lg,
  },
  runningGradient: {
    padding: Spacing.lg,
  },
  runningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  runningIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#a3e635',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  runningTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    flex: 1,
  },
  runningTime: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    minWidth: '45%',
  },
  statCardLeft: {
    marginRight: 'auto',
  },
  statCardRight: {
    marginLeft: 'auto',
  },
  statValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 2,
  },
  statUnit: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Spacing['6xl'],
  },
  workoutSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  workoutList: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  workoutIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text,
    marginBottom: 2,
  },
  workoutTime: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
  },
  musicSection: {
    paddingHorizontal: Spacing.lg,
  },
  musicList: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  musicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  musicImage: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
  },
  musicInfo: {
    flex: 1,
  },
  musicTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text,
    marginBottom: 2,
  },
  musicArtist: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
  },
  musicControls: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  musicButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});