import type { LayoutData, TileData } from '../types/game';

function populateTiles(
  layout: LayoutData[],
  words: string[],
  sequence: number[],
): TileData[] {
  const letters = words.flatMap((word, wordIndex) =>
    [...word].map(value => ({
      id: `letter-${wordIndex + 1}`,
      value,
      wordOrder: wordIndex + 1,
    })),
  );

  return layout.map(tile => {
    const sequenceIndex = sequence.indexOf(Number(tile.id));

    if (sequenceIndex === -1) {
      throw new Error(`Tile ${tile.id} is not in sequence`);
    }

    const letter = letters[sequenceIndex];

    return {
      ...tile,
      letter: {
        id: letter.id,
        value: letter.value,
        wordOrder: letter.wordOrder,
      },
    };
  });
}

export default populateTiles;
