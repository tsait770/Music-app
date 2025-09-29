import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  ViewStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Shadows } from '@/constants/theme';

interface FloatingActionButtonProps {
  icon: LucideIcon;
  onPress: () => void;
  style?: ViewStyle;
  size?: number;
  variant?: 'primary' | 'secondary' | 'neon' | 'morphing' | 'ripple' | 'magnetic';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
}

export function FloatingActionButton({
  icon: Icon,
  onPress,
  style,
  size = 56,
  variant = 'primary',
  position = 'bottom-right',
}: FloatingActionButtonProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const morphAnim = useRef(new Animated.Value(0)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const magneticAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let pulseTimeout: NodeJS.Timeout;
    let morphTimeout: NodeJS.Timeout;
    let magneticTimeout: NodeJS.Timeout;

    // Initial entrance animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
      delay: 300,
    }).start();

    // Continuous animations based on variant
    if (variant === 'neon') {
      const pulse = () => {
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
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
      pulseTimeout = setTimeout(() => pulse(), 500);
    }

    if (variant === 'morphing') {
      const morph = () => {
        Animated.sequence([
          Animated.timing(morphAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(morphAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start(() => morph());
      };
      morphTimeout = setTimeout(() => morph(), 800);
    }

    if (variant === 'magnetic') {
      const magnetic = () => {
        Animated.sequence([
          Animated.timing(magneticAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(magneticAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]).start(() => magnetic());
      };
      magneticTimeout = setTimeout(() => magnetic(), 1000);
    }

    return () => {
      if (pulseTimeout) clearTimeout(pulseTimeout);
      if (morphTimeout) clearTimeout(morphTimeout);
      if (magneticTimeout) clearTimeout(magneticTimeout);
    };
  }, [scaleAnim, pulseAnim, morphAnim, magneticAnim, variant]);

  const handlePressIn = () => {
    const animations = [];
    
    switch (variant) {
      case 'ripple':
        animations.push(
          Animated.timing(rippleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
            tension: 400,
            friction: 8,
          })
        );
        break;
      case 'magnetic':
        animations.push(
          Animated.spring(scaleAnim, {
            toValue: 1.1,
            useNativeDriver: true,
            tension: 200,
            friction: 5,
          })
        );
        break;
      default:
        animations.push(
          Animated.spring(scaleAnim, {
            toValue: 0.9,
            useNativeDriver: true,
            tension: 300,
            friction: 10,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          })
        );
    }
    
    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }
  };

  const handlePressOut = () => {
    const animations = [];
    
    switch (variant) {
      case 'ripple':
        animations.push(
          Animated.timing(rippleAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 400,
            friction: 8,
          })
        );
        break;
      case 'magnetic':
        animations.push(
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 200,
            friction: 5,
          })
        );
        break;
      default:
        animations.push(
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
          })
        );
    }
    
    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }
  };

  const getAnimatedStyle = () => {
    const baseTransform: any[] = [];
    
    switch (variant) {
      case 'neon':
        baseTransform.push({ scale: Animated.multiply(scaleAnim, pulseAnim) });
        break;
      case 'morphing':
        const morphScale = morphAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.2, 1],
        });
        baseTransform.push({ scale: Animated.multiply(scaleAnim, morphScale) });
        break;
      case 'ripple':
        baseTransform.push({ scale: scaleAnim });
        break;
      case 'magnetic':
        const magneticOffset = magneticAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 3],
        });
        baseTransform.push(
          { scale: scaleAnim },
          { translateY: magneticOffset }
        );
        break;
      default:
        const rotation = rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        });
        baseTransform.push(
          { scale: Animated.multiply(scaleAnim, pulseAnim) },
          { rotate: rotation }
        );
    }
    
    return {
      transform: baseTransform,
    };
  };

  const getPositionStyle = () => {
    const basePosition = { position: 'absolute' as const };
    
    switch (position) {
      case 'bottom-left':
        return { ...basePosition, bottom: 20, left: 20 };
      case 'top-right':
        return { ...basePosition, top: 60, right: 20 };
      case 'top-left':
        return { ...basePosition, top: 60, left: 20 };
      case 'center':
        return { ...basePosition, top: '50%', left: '50%', marginTop: -size/2, marginLeft: -size/2 };
      default: // bottom-right
        return { ...basePosition, bottom: 20, right: 20 };
    }
  };

  const buttonStyle = [
    styles.button,
    getPositionStyle(),
    { width: size, height: size, borderRadius: size / 2 },
    style,
  ];

  if (variant === 'primary' || variant === 'morphing') {
    return (
      <Animated.View style={[getAnimatedStyle(), buttonStyle]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          style={styles.touchable}
        >
          <LinearGradient
            colors={variant === 'morphing' ? [Colors.accentOrange, Colors.accent] : [Colors.accent, Colors.accentGreen]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradient, { borderRadius: size / 2 }]}
          >
            <Icon size={size * 0.4} color={Colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  if (variant === 'ripple') {
    return (
      <Animated.View style={[getAnimatedStyle(), buttonStyle]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          style={[styles.touchable, styles.ripple, { borderRadius: size / 2 }]}
        >
          <Animated.View 
            style={[
              styles.rippleEffect,
              {
                width: size * 2,
                height: size * 2,
                borderRadius: size,
                opacity: rippleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.3],
                }),
                transform: [{
                  scale: rippleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  })
                }]
              }
            ]}
          />
          <Icon size={size * 0.4} color={Colors.white} />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'neon':
        return styles.neon;
      case 'magnetic':
        return styles.magnetic;
      default:
        return styles.primary;
    }
  };

  return (
    <Animated.View style={[getAnimatedStyle(), buttonStyle]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={[styles.touchable, getVariantStyle(), { borderRadius: size / 2 }]}
      >
        <Icon 
          size={size * 0.4} 
          color={variant === 'secondary' ? Colors.text : Colors.white} 
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    ...Shadows.lg,
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  primary: {
    backgroundColor: Colors.accent,
  },
  secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.textMuted,
  },
  neon: {
    backgroundColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
  },
  magnetic: {
    backgroundColor: Colors.accentOrange,
    shadowColor: Colors.accentOrange,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 12,
  },
  ripple: {
    backgroundColor: Colors.accent,
    overflow: 'hidden',
    position: 'relative',
  },
  rippleEffect: {
    position: 'absolute',
    backgroundColor: Colors.white,
    top: '50%',
    left: '50%',
    marginTop: -50,
    marginLeft: -50,
  },
});