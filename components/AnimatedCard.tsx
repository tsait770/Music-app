import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius, Shadows } from '@/constants/theme';

interface AnimatedCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: 'default' | 'gradient' | 'glass' | 'neon' | 'floating' | 'morphing' | 'holographic';
  animationType?: 'scale' | 'slide' | 'fade' | 'bounce' | 'flip' | 'wave' | 'elastic';
  delay?: number;
  interactive?: boolean;
}

export function AnimatedCard({
  children,
  onPress,
  style,
  variant = 'default',
  animationType = 'scale',
  delay = 0,
  interactive = true,
}: AnimatedCardProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pressScaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const morphAnim = useRef(new Animated.Value(0)).current;
  const holoAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animations = [];
    let floatTimeout: NodeJS.Timeout;
    let morphTimeout: NodeJS.Timeout;
    let holoTimeout: NodeJS.Timeout;

    switch (animationType) {
      case 'scale':
        animations.push(
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
            delay,
          })
        );
        break;
      case 'slide':
        animations.push(
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
            delay,
          })
        );
        break;
      case 'fade':
        animations.push(
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
            delay,
          })
        );
        break;
      case 'bounce':
        animations.push(
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 200,
            friction: 3,
            delay,
          })
        );
        break;
      case 'flip':
        animations.push(
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
            delay,
          })
        );
        break;
      case 'wave':
        animations.push(
          Animated.spring(waveAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 80,
            friction: 4,
            delay,
          })
        );
        break;
      case 'elastic':
        animations.push(
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 50,
            friction: 2,
            delay,
          })
        );
        break;
    }

    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }

    // Continuous animations for specific variants
    if (variant === 'floating') {
      const float = () => {
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start(() => float());
      };
      floatTimeout = setTimeout(() => float(), delay);
    }

    if (variant === 'morphing') {
      const morph = () => {
        Animated.sequence([
          Animated.timing(morphAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(morphAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]).start(() => morph());
      };
      morphTimeout = setTimeout(() => morph(), delay);
    }

    if (variant === 'holographic') {
      const holo = () => {
        Animated.timing(holoAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => {
          holoAnim.setValue(0);
          holo();
        });
      };
      holoTimeout = setTimeout(() => holo(), delay);
    }

    return () => {
      if (floatTimeout) clearTimeout(floatTimeout);
      if (morphTimeout) clearTimeout(morphTimeout);
      if (holoTimeout) clearTimeout(holoTimeout);
    };
  }, [animationType, variant, delay, scaleAnim, slideAnim, fadeAnim, rotateAnim, floatAnim, morphAnim, holoAnim, waveAnim]);

  const handlePressIn = () => {
    if (onPress && interactive) {
      const pressAnimations = [];
      
      switch (variant) {
        case 'neon':
          pressAnimations.push(
            Animated.spring(pressScaleAnim, {
              toValue: 0.95,
              useNativeDriver: true,
              tension: 400,
              friction: 8,
            })
          );
          break;
        case 'glass':
          pressAnimations.push(
            Animated.spring(pressScaleAnim, {
              toValue: 0.97,
              useNativeDriver: true,
              tension: 200,
              friction: 12,
            })
          );
          break;
        default:
          pressAnimations.push(
            Animated.spring(pressScaleAnim, {
              toValue: 0.98,
              useNativeDriver: true,
              tension: 300,
              friction: 10,
            })
          );
      }
      
      if (pressAnimations.length > 0) {
        Animated.parallel(pressAnimations).start();
      }
    }
  };

  const handlePressOut = () => {
    if (onPress && interactive) {
      Animated.spring(pressScaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    }
  };

  const getAnimatedStyle = () => {
    const baseTransform: any[] = [{ scale: pressScaleAnim }];
    let opacity: any = 1;

    // Add floating animation if variant is floating
    if (variant === 'floating') {
      const floatY = floatAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -8],
      });
      baseTransform.push({ translateY: floatY });
    }

    // Add morphing animation if variant is morphing
    if (variant === 'morphing') {
      const morphScale = morphAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.05, 1],
      });
      baseTransform.push({ scale: morphScale });
    }

    switch (animationType) {
      case 'scale':
        baseTransform.push({ scale: scaleAnim });
        break;
      case 'slide':
        baseTransform.push({ translateY: slideAnim });
        break;
      case 'fade':
        opacity = fadeAnim;
        break;
      case 'bounce':
        baseTransform.push({ scale: scaleAnim });
        break;
      case 'flip':
        const rotation = rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        });
        baseTransform.push({ rotateY: rotation });
        break;
      case 'wave':
        const waveX = waveAnim.interpolate({
          inputRange: [0, 0.25, 0.5, 0.75, 1],
          outputRange: [0, 5, 0, -5, 0],
        });
        baseTransform.push({ translateX: waveX });
        break;
      case 'elastic':
        baseTransform.push({ scale: scaleAnim });
        break;
    }

    return {
      transform: baseTransform,
      opacity,
    };
  };

  const getCardStyle = () => {
    switch (variant) {
      case 'gradient':
        return styles.gradientCard;
      case 'glass':
        return styles.glassCard;
      case 'neon':
        return styles.neonCard;
      case 'floating':
        return styles.floatingCard;
      case 'morphing':
        return styles.morphingCard;
      case 'holographic':
        return styles.holographicCard;
      default:
        return styles.defaultCard;
    }
  };

  const CardContent = () => (
    <Animated.View style={[getCardStyle(), getAnimatedStyle(), style]}>
      {children}
    </Animated.View>
  );

  if (variant === 'gradient') {
    return (
      <Animated.View style={[getAnimatedStyle(), style]}>
        {onPress ? (
          <TouchableOpacity
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
          >
            <LinearGradient
              colors={[Colors.accent + '20', Colors.accentGreen + '20']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.gradientCard]}
            >
              {children}
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <LinearGradient
            colors={[Colors.accent + '20', Colors.accentGreen + '20']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradientCard]}
          >
            {children}
          </LinearGradient>
        )}
      </Animated.View>
    );
  }

  if (variant === 'holographic') {
    return (
      <Animated.View style={[getAnimatedStyle(), style]}>
        {onPress ? (
          <TouchableOpacity
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
          >
            <View style={[getCardStyle()]}>
              <Animated.View 
                style={[
                  styles.holoOverlay,
                  {
                    opacity: holoAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 0.3, 0],
                    }),
                    transform: [{
                      translateX: holoAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-100, 100],
                      })
                    }]
                  }
                ]}
              />
              {children}
            </View>
          </TouchableOpacity>
        ) : (
          <View style={[getCardStyle()]}>
            <Animated.View 
              style={[
                styles.holoOverlay,
                {
                  opacity: holoAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 0.3, 0],
                  }),
                  transform: [{
                    translateX: holoAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-100, 100],
                    })
                  }]
                }
              ]}
            />
            {children}
          </View>
        )}
      </Animated.View>
    );
  }

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
}

const styles = StyleSheet.create({
  defaultCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.md,
    borderWidth: 1,
    borderColor: Colors.textMuted + '20',
  },
  gradientCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.accent + '30',
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    shadowColor: Colors.white,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  neonCard: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  floatingCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.lg,
    borderWidth: 1,
    borderColor: Colors.textMuted + '10',
  },
  morphingCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.xl,
    borderWidth: 1,
    borderColor: Colors.accent + '20',
  },
  holographicCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    position: 'relative',
  },
  holoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 100,
    transform: [{ skewX: '-20deg' }] as any,
  },
});