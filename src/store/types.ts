export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];
export type GameState = 'playing' | 'won' | 'draw';
export type GameMode = 'pvp' | 'easy' | 'medium' | 'hard';

export interface GameStats {
  xWins: number;
  oWins: number;
  draws: number;
}

export interface GameStore {
  board: Board;
  currentPlayer: Player;
  gameState: GameState;
  winner: Player | null;
  gameMode: GameMode;
  stats: GameStats;
  makeMove: (index: number) => void;
  resetGame: () => void;
  setGameMode: (mode: GameMode) => void;
}