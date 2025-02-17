import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './GameModeButton.styles';
import { GameModeButtonProps } from './GameModeButton.types';

export function GameModeButton({ mode, currentMode, onPress, label }: GameModeButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        mode === currentMode && styles.buttonActive
      ]}
      onPress={() => onPress(mode)}
    >
      <Text style={[
        styles.buttonText,
        mode === currentMode && styles.buttonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}