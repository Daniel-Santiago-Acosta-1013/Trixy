import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Board } from '../../components/Board';
import { GameModeButton } from '../../components/GameModeButton';
import { useGameStore } from '../../store/gameStore';
import { styles } from './Game.styles';

export function GameScreen() {
  const { 
    board, 
    currentPlayer, 
    gameState, 
    winner, 
    gameMode,
    makeMove, 
    resetGame,
    setGameMode 
  } = useGameStore();

  const handleReset = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    resetGame();
  };

  const handleModeChange = (mode: 'pvp' | 'easy' | 'medium' | 'hard') => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    setGameMode(mode);
  };

  const getPlayerColor = (player: string) => {
    return player === 'X' ? 'Red' : 'Turquoise';
  };

  return (
    <LinearGradient
      colors={['#141E30', '#243B55']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View 
          entering={FadeIn}
          style={styles.modeContainer}
        >
          <GameModeButton 
            mode="pvp" 
            currentMode={gameMode} 
            onPress={handleModeChange}
            label="PvP"
          />
          <GameModeButton 
            mode="easy" 
            currentMode={gameMode} 
            onPress={handleModeChange}
            label="Easy Bot"
          />
          <GameModeButton 
            mode="medium" 
            currentMode={gameMode} 
            onPress={handleModeChange}
            label="Medium Bot"
          />
          <GameModeButton 
            mode="hard" 
            currentMode={gameMode} 
            onPress={handleModeChange}
            label="Hard Bot"
          />
        </Animated.View>

        <Animated.Text 
          entering={FadeIn}
          style={styles.status}
        >
          {gameState === 'playing' 
            ? `${getPlayerColor(currentPlayer)}'s Turn`
            : gameState === 'won'
            ? `${getPlayerColor(winner!)} Wins!`
            : "It's a Draw!"}
        </Animated.Text>

        <Board
          board={board}
          onCellPress={makeMove}
          disabled={gameState !== 'playing' || (gameMode !== 'pvp' && currentPlayer === 'O')}
        />

        {gameState !== 'playing' && (
          <Animated.View
            entering={SlideInDown.springify()}
            style={styles.resetButtonContainer}
          >
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>Play Again</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </LinearGradient>
  );
}