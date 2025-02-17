export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];

export interface BoardProps {
  board: Board;
  onCellPress: (index: number) => void;
  disabled?: boolean;
}