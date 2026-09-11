export type TileData = {
  id: number;
  letter: LetterData;
  x: number;
  y: number;
  zIndex: number;
};

export type LayoutData = Omit<TileData, 'letter'>;

export type LetterData = {
  id: string;
  value: string;
  wordOrder: number;
};
