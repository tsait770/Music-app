import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'outline' | 'neon' | 'glass' | 'pulse' | 'bounce' | 'glow';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

export function AnimatedButton({
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon,
  loading = false,
}: AnimatedButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Continuous animations for specific variants
    if (variant === 'pulse') {
      const pulse = () => {
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start(() => pulse());
      };
      pulse();
    }

    if (variant === 'glow') {
      const glow = () => {
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]).start(() => glow());
      };
      glow();
    }

    if (variant === 'bounce') {
      Animated.spring(bounceAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 3,
        delay: 200,
      }).start();
    }

    // Shimmer effect for loading
    if (loading) {
      const shimmer = () => {
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          shimmerAnim.setValue(0);
          shimmer();
        });
      };
      shimmer();
    }
  }, [variant, loading, pulseAnim, glowAnim, bounceAnim, shimmerAnim]);

  const handlePressIn = () => {
    const animations = [];
    
    switch (variant) {
      case 'bounce':
        animations.push(
          Animated.spring(scaleAnim, {
            toValue: 0.9,
            useNativeDriver: true,
            tension: 400,
            friction: 3,
          })
        );
        break;
      case 'neon':
        animations.push(
          Animated.parallel([
            Animated.spring(scaleAnim, {
              toValue: 0.98,
              useNativeDriver: true,
              tension: 300,
              friction: 10,
            }),
            Animated.timing(rotateAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ])
        );
        break;
      default:
        animations.push(
          Animated.parallel([
            Animated.spring(scaleAnim, {
              toValue: 0.95,
              useNativeDriver: true,
              tension: 300,
              friction: 10,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0.8,
              duration: 100,
              useNativeDriver: true,
            }),
          ])
        );
    }
    
    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }
  };

  const handlePressOut = () => {
    const animations = [];
    
    switch (variant) {
      case 'bounce':
        animations.push(
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 400,
            friction: 3,
          })
        );
        break;
      case 'neon':
        animations.push(
          Animated.parallel([
            Animated.spring(scaleAnim, {
              toValue: 1,
              useNativeDriver: true,
              tension: 300,
              friction: 10,
            }),
            Animated.timing(rotateAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ])
        );
        break;
      default:
        animations.push(
          Animated.parallel([
            Animated.spring(scaleAnim, {
              toValue: 1,
              useNativeDriver: true,
              tension: 300,
              friction: 10,
            }),
            Animated.timing(opacityAnim, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ])
        );
    }
    
    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    switch (variant) {
      case 'secondary':
        return [...baseStyle, styles.secondary];
      case 'outline':
        return [...baseStyle, styles.outline];
      case 'neon':
        return [...baseStyle, styles.neon];
      case 'glass':
        return [...baseStyle, styles.glass];
      case 'pulse':
        return [...baseStyle, styles.pulse];
      case 'bounce':
        return [...baseStyle, styles.bounce];
      case 'glow':
        return [...baseStyle, styles.glow];
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    switch (variant) {
      case 'secondary':
        return [...baseStyle, styles.secondaryText];
      case 'outline':
        return [...baseStyle, styles.outlineText];
      case 'neon':
        return [...baseStyle, styles.neonText];
      case 'glass':
        return [...baseStyle, styles.glassText];
      case 'pulse':
      case 'bounce':
      case 'glow':
        return [...baseStyle, styles.primaryText];
      default:
        return [...baseStyle, styles.primaryText];
    }
  };

  const getAnimatedStyle = () => {
    const baseTransform = [];
    
    switch (variant) {
      case 'pulse':
        baseTransform.push({ scale: Animated.multiply(scaleAnim, pulseAnim) });
        break;
      case 'bounce':
        baseTransform.push({ scale: Animated.multiply(scaleAnim, bounceAnim) });
        break;
      case 'neon':
        const rotation = rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '2deg'],
        });
        baseTransform.push({ scale: scaleAnim }, { rotate: rotation });
        break;
      case 'glow':
        const glowScale = glowAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.02],
        });
        baseTransform.push({ scale: Animated.multiply(scaleAnim, glowScale) });
        break;
      default:
        baseTransform.push({ scale: scaleAnim });
    }
    
    return {
      transform: baseTransform,
      opacity: variant === 'glow' ? Animated.multiply(opacityAnim, glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.9, 1],
      })) : opacityAnim,
    };
  };

  const renderContent = () => (
    <View style={styles.contentContainer}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[...getTextStyle(), textStyle, disabled && styles.disabledText]}>
        {loading ? 'Loading...' : title}
      </Text>
      {loading && (
        <Animated.View 
          style={[
            styles.shimmer,
            {
              transform: [{
                translateX: shimmerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 100],
                })
              }]
            }
          ]}
        />
      )}
    </View>
  );

  if (variant === 'primary' || variant === 'glow') {
    return (
      <Animated.View style={[getAnimatedStyle(), style]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          activeOpacity={1}
        >
          <LinearGradient
            colors={disabled ? ['#ccc', '#999'] : variant === 'glow' ? [Colors.accent, Colors.accentGreen] : [Colors.accent, Colors.accentOrange]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[...getButtonStyle(), disabled && styles.disabled]}
          >
            {renderContent()}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  if (variant === 'neon') {
    return (
      <Animated.View style={[getAnimatedStyle(), style]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          activeOpacity={1}
        >
          <View style={[...getButtonStyle(), disabled && styles.disabled]}>
            {renderContent()}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  if (variant === 'glass') {
    return (
      <Animated.View style={[getAnimatedStyle(), style]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          activeOpacity={1}
        >
          <View style={[...getButtonStyle(), disabled && styles.disabled]}>
            {renderContent()}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[getAnimatedStyle(), style]}>
      <TouchableOpacity
        style={[...getButtonStyle(), disabled && styles.disabled]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={1}
      >
        {renderContent()}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  small: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: Spacing.lg,
    minHeight: 56,
  },
  secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.textMuted,
  },
  outline: {
    backgroundColor: Colors.transparent,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  neon: {
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: Colors.white,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 8,
  },
  pulse: {
    backgroundColor: Colors.accent,
  },
  bounce: {
    backgroundColor: Colors.accentOrange,
  },
  glow: {
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 20,
  },
  disabled: {
    opacity: 0.6,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: Spacing.sm,
  },
  text: {
    fontWeight: Typography.fontWeight.semibold,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.medium,
  },
  smallText: {
    fontSize: Typography.fontSize.sm,
  },
  mediumText: {
    fontSize: Typography.fontSize.lg,
  },
  largeText: {
    fontSize: Typography.fontSize.xl,
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.text,
  },
  outlineText: {
    color: Colors.accent,
  },
  neonText: {
    color: Colors.accent,
    textShadowColor: Colors.accent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  glassText: {
    color: Colors.white,
    textShadowColor: Colors.black,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  disabledText: {
    color: Colors.textMuted,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 50,
  },
});