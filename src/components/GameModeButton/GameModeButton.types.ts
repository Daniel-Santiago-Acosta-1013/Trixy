import { GameMode } from '../../store/types';

export interface GameModeButtonProps {
  mode: GameMode;
  currentMode: GameMode;
  onPress: (mode: GameMode) => void;
  label: string;
}