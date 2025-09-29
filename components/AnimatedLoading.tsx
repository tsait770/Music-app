import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';

interface AnimatedLoadingProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
  variant?: 'dots' | 'pulse' | 'wave';
}

export function AnimatedLoading({
  size = 40,
  color = '#FF385C',
  style,
  variant = 'dots',
}: AnimatedLoadingProps) {
  const animValue1 = useRef(new Animated.Value(0)).current;
  const animValue2 = useRef(new Animated.Value(0)).current;
  const animValue3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createAnimation = (animValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration: 600,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
    };

    if (variant === 'dots') {
      Animated.parallel([
        createAnimation(animValue1, 0),
        createAnimation(animValue2, 200),
        createAnimation(animValue3, 400),
      ]).start();
    } else if (variant === 'pulse') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animValue1, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(animValue1, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (variant === 'wave') {
      const createWaveAnimation = (animValue: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(animValue, {
              toValue: 1,
              duration: 400,
              delay,
              useNativeDriver: true,
            }),
            Animated.timing(animValue, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        );
      };

      Animated.parallel([
        createWaveAnimation(animValue1, 0),
        createWaveAnimation(animValue2, 100),
        createWaveAnimation(animValue3, 200),
      ]).start();
    }
  }, [animValue1, animValue2, animValue3, variant]);

  const renderDots = () => {
    const dotSize = size * 0.2;
    const spacing = size * 0.15;

    return (
      <View style={[styles.dotsContainer, style]}>
        <Animated.View
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              backgroundColor: color,
              opacity: animValue1,
              transform: [{ scale: animValue1 }],
              marginHorizontal: spacing,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              backgroundColor: color,
              opacity: animValue2,
              transform: [{ scale: animValue2 }],
              marginHorizontal: spacing,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              backgroundColor: color,
              opacity: animValue3,
              transform: [{ scale: animValue3 }],
              marginHorizontal: spacing,
            },
          ]}
        />
      </View>
    );
  };

  const renderPulse = () => {
    return (
      <View style={[styles.pulseContainer, style]}>
        <Animated.View
          style={[
            styles.pulseCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
              transform: [{ scale: animValue1 }],
            },
          ]}
        />
      </View>
    );
  };

  const renderWave = () => {
    const barWidth = size * 0.1;
    const barMaxHeight = size;
    const spacing = size * 0.05;

    return (
      <View style={[styles.waveContainer, style]}>
        <Animated.View
          style={[
            styles.waveBar,
            {
              width: barWidth,
              height: animValue1.interpolate({
                inputRange: [0, 1],
                outputRange: [barMaxHeight * 0.3, barMaxHeight],
              }),
              backgroundColor: color,
              marginHorizontal: spacing,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.waveBar,
            {
              width: barWidth,
              height: animValue2.interpolate({
                inputRange: [0, 1],
                outputRange: [barMaxHeight * 0.3, barMaxHeight],
              }),
              backgroundColor: color,
              marginHorizontal: spacing,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.waveBar,
            {
              width: barWidth,
              height: animValue3.interpolate({
                inputRange: [0, 1],
                outputRange: [barMaxHeight * 0.3, barMaxHeight],
              }),
              backgroundColor: color,
              marginHorizontal: spacing,
            },
          ]}
        />
      </View>
    );
  };

  switch (variant) {
    case 'pulse':
      return renderPulse();
    case 'wave':
      return renderWave();
    default:
      return renderDots();
  }
}

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: 50,
  },
  pulseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    // Base styles handled by animated style
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  waveBar: {
    borderRadius: 2,
  },
});