import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './StatCard.styles';
import { StatCardProps } from './StatCard.types';

export function StatCard({ title, value, icon, color, delay }: StatCardProps) {
  return (
    <Animated.View 
      entering={FadeInUp.delay(delay)}
      style={[styles.card, { backgroundColor: color }]}
    >
      <Ionicons name={icon} size={32} color="#fff" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </Animated.View>
  );
}