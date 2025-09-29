import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { Star } from 'lucide-react-native';
import { Category } from '@/constants/categories';
import { Colors } from '@/constants/colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const scaleAnims = useRef(categories.map(() => new Animated.Value(1))).current;
  const allScaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = (index?: number) => {
    const anim = index !== undefined ? scaleAnims[index] : allScaleAnim;
    Animated.spring(anim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 400,
      friction: 8,
    }).start();
  };

  const handlePressOut = (index?: number) => {
    const anim = index !== undefined ? scaleAnims[index] : allScaleAnim;
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 400,
      friction: 8,
    }).start();
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Animated.View style={[styles.animatedContainer, { transform: [{ scale: allScaleAnim }] }]}>
        <TouchableOpacity
          style={[
            styles.categoryItem,
            !selectedCategory && styles.categoryItemActive,
          ]}
          onPress={() => onSelectCategory(null)}
          onPressIn={() => handlePressIn()}
          onPressOut={() => handlePressOut()}
          activeOpacity={1}
        >
          <View style={styles.iconContainer}>
            <Star 
              size={16} 
              color={!selectedCategory ? Colors.white : Colors.textMuted} 
              fill={!selectedCategory ? Colors.white : 'transparent'} 
            />
          </View>
          <Text
            style={[
              styles.categoryText,
              !selectedCategory && styles.categoryTextActive,
            ]}
          >
            全部
          </Text>
        </TouchableOpacity>
      </Animated.View>
      
      {categories.map((category, index) => (
        <Animated.View
          key={category.id}
          style={[styles.animatedContainer, { transform: [{ scale: scaleAnims[index] }] }]}
        >
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategory === category.id && styles.categoryItemActive,
            ]}
            onPress={() => onSelectCategory(category.id)}
            onPressIn={() => handlePressIn(index)}
            onPressOut={() => handlePressOut(index)}
            activeOpacity={1}
          >
            <View style={styles.iconContainer}>
              <category.icon 
                size={16} 
                color={selectedCategory === category.id ? Colors.white : Colors.textMuted} 
              />
            </View>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.textMuted + '30',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryItemActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconContainer: {
    marginRight: Spacing.xs,
    width: 20,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textMuted,
    fontFamily: Typography.fontFamily.medium,
  },
  categoryTextActive: {
    color: Colors.white,
  },
  animatedContainer: {
    // Base container for animated category items
  },
});