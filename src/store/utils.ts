import { Board, Player, GameMode } from './types';

export const checkWinner = (board: Board): Player | null => {
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

export const getAvailableMoves = (board: Board): number[] => {
  return board.reduce((moves: number[], cell, index) => {
    if (cell === null) moves.push(index);
    return moves;
  }, []);
};

export const minimax = (
  board: Board, 
  depth: number, 
  isMaximizing: boolean, 
  alpha: number = -Infinity, 
  beta: number = Infinity
): number => {
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

export const getBotMove = (board: Board, difficulty: GameMode): number => {
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