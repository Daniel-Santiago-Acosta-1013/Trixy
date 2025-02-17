import React from 'react';
import { TouchableOpacity, View, Platform } from 'react-native';
import Animated, { 
  FadeIn,
  ZoomIn,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { styles } from './Board.styles';
import { BoardProps } from './Board.types';

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