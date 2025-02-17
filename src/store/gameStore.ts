import { create } from 'zustand';
import { GameStore, Board, Player, GameMode } from './types';
import { checkWinner, getAvailableMoves, minimax, getBotMove } from './utils';

const initialBoard: Board = Array(9).fill(null);

export const useGameStore = create<GameStore>((set, get) => ({
  board: initialBoard,
  currentPlayer: 'X',
  gameState: 'playing',
  winner: null,
  gameMode: 'pvp',
  stats: {
    xWins: 0,
    oWins: 0,
    draws: 0,
  },
  makeMove: (index: number) => {
    const { board, currentPlayer, gameState, gameMode } = get();

    if (gameState !== 'playing' || board[index] !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const winner = checkWinner(newBoard);
    const isDraw = !winner && newBoard.every((cell) => cell !== null);
    const newGameState = winner ? 'won' : isDraw ? 'draw' : 'playing';

    const newStats = { ...get().stats };
    if (winner === 'X') newStats.xWins++;
    if (winner === 'O') newStats.oWins++;
    if (isDraw) newStats.draws++;

    set({
      board: newBoard,
      currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
      gameState: newGameState,
      winner,
      stats: newStats,
    });

    // Bot's turn
    if (!winner && !isDraw && gameMode !== 'pvp' && currentPlayer === 'X') {
      setTimeout(() => {
        const botMove = getBotMove(newBoard, gameMode);
        get().makeMove(botMove);
      }, 500);
    }
  },
  resetGame: () => {
    set({
      board: initialBoard,
      currentPlayer: 'X',
      gameState: 'playing',
      winner: null,
    });
  },
  setGameMode: (mode: GameMode) => {
    set({
      gameMode: mode,
      board: initialBoard,
      currentPlayer: 'X',
      gameState: 'playing',
      winner: null,
    });
  },
}));