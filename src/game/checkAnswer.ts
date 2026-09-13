import type { TileData } from '../types/game';

const checkAnswer = (
  tiles: TileData[],
  sequence: number[],
  wordOrder: number,
) => {
  const startIndex = (wordOrder - 1) * 5;
  const expectedIds = sequence.slice(startIndex, startIndex + 5);

  return tiles.every((tile, index) => tile.id === expectedIds[index]);
};

export default checkAnswer;
