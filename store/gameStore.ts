import { create } from 'zustand';

type Player = 'X' | 'O';
type Cell = Player | null;
type Board = Cell[];
type GameState = 'playing' | 'won' | 'draw';
type GameMode = 'pvp' | 'easy' | 'medium' | 'hard';

interface GameStore {
  board: Board;
  currentPlayer: Player;
  gameState: GameState;
  winner: Player | null;
  gameMode: GameMode;
  stats: {
    xWins: number;
    oWins: number;
    draws: number;
  };
  makeMove: (index: number) => void;
  resetGame: () => void;
  setGameMode: (mode: GameMode) => void;
}

const initialBoard: Board = Array(9).fill(null);

const checkWinner = (board: Board): Player | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }

  return null;
};

const getAvailableMoves = (board: Board): number[] => {
  return board.reduce((moves: number[], cell, index) => {
    if (cell === null) moves.push(index);
    return moves;
  }, []);
};

const minimax = (board: Board, depth: number, isMaximizing: boolean, alpha: number = -Infinity, beta: number = Infinity): number => {
  const winner = checkWinner(board);
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (getAvailableMoves(board).length === 0) return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of getAvailableMoves(board)) {
      const newBoard = [...board];
      newBoard[move] = 'O';
      const evaluation = minimax(newBoard, depth + 1, false, alpha, beta);
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of getAvailableMoves(board)) {
      const newBoard = [...board];
      newBoard[move] = 'X';
      const evaluation = minimax(newBoard, depth + 1, true, alpha, beta);
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

const getBotMove = (board: Board, difficulty: GameMode): number => {
  const availableMoves = getAvailableMoves(board);
  
  if (difficulty === 'easy') {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }
  
  if (difficulty === 'medium') {
    const random = Math.random();
    if (random < 0.3) {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
  }

  let bestScore = -Infinity;
  let bestMove = availableMoves[0];

  for (const move of availableMoves) {
    const newBoard = [...board];
    newBoard[move] = 'O';
    const score = minimax(newBoard, 0, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};

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
    const newGameState: GameState = winner ? 'won' : isDraw ? 'draw' : 'playing';

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