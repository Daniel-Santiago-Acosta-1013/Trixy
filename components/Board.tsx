import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Animated, { 
  FadeIn,
  ZoomIn,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface BoardProps {
  board: (string | null)[];
  onCellPress: (index: number) => void;
  disabled?: boolean;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function Board({ board, onCellPress, disabled }: BoardProps) {
  const handlePress = (index: number) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onCellPress(index);
  };

  const renderCell = (index: number) => {
    const value = board[index];
    
    return (
      <AnimatedTouchableOpacity
        key={index}
        style={[
          styles.cell, 
          index % 3 !== 2 && styles.rightBorder, 
          index < 6 && styles.bottomBorder,
          value && styles.filledCell
        ]}
        onPress={() => handlePress(index)}
        disabled={disabled || value !== null}
        entering={FadeIn.duration(200)}
      >
        {value && (
          <Animated.View
            entering={ZoomIn.duration(200)}
            style={[
              styles.symbolContainer,
              value === 'X' ? styles.xContainer : styles.oContainer
            ]}
          >
            <Ionicons
              name={value === 'X' ? 'close' : 'ellipse-outline'}
              size={50}
              color={value === 'X' ? '#FF6B6B' : '#4ECDC4'}
            />
          </Animated.View>
        )}
      </AnimatedTouchableOpacity>
    );
  };

  return (
    <View style={styles.board}>
      {board.map((_, index) => renderCell(index))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#2C3E50',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495E',
    transition: 'all 0.2s ease',
  },
  filledCell: {
    backgroundColor: '#2C3E50',
  },
  rightBorder: {
    borderRightWidth: 2,
    borderRightColor: '#2C3E50',
  },
  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#2C3E50',
  },
  symbolContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  xContainer: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  oContainer: {
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
  },
});