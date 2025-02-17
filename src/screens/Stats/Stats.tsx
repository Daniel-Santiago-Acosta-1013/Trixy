import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore } from '../../store/gameStore';
import { StatCard } from '../../components/StatCard';
import { styles } from './Stats.styles';

export function StatsScreen() {
  const { stats } = useGameStore();

  return (
    <LinearGradient
      colors={['#141E30', '#243B55']}
      style={styles.container}
    >
      <Text style={styles.title}>Game Statistics</Text>
      <View style={styles.statsContainer}>
        <StatCard
          title="X Wins"
          value={stats.xWins}
          icon="close"
          color="#FF6B6B"
          delay={100}
        />
        <StatCard
          title="O Wins"
          value={stats.oWins}
          icon="ellipse-outline"
          color="#4ECDC4"
          delay={200}
        />
        <StatCard
          title="Draws"
          value={stats.draws}
          icon="remove"
          color="#95A5A6"
          delay={300}
        />
      </View>
    </LinearGradient>
  );
}