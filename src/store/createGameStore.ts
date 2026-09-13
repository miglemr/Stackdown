import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { LayoutData, TileData } from '../types/game';
import populateTiles from '../game/populateTiles';
import checkAnswer from '../game/checkAnswer';

interface GameProps {
  tiles: TileData[];
  selectedTiles: TileData[];
  removedTiles: TileData[];
  wordOrder: number;
}

interface InitProps {
  layout: LayoutData[];
  words: string[];
  sequence: number[];
}

interface GameState extends GameProps {
  selectTile: (tile: TileData) => void;
  unselectTile: (tile: TileData) => void;
  clearSelection: () => void;
}

type GameStore = ReturnType<typeof createGameStore>;

const createGameStore = (initProps: InitProps) => {
  const DEFAULT_PROPS: GameProps = {
    tiles: [],
    selectedTiles: [],
    removedTiles: [],
    wordOrder: 1,
  };

  return createStore<GameState>()(
    devtools(
      set => ({
        ...DEFAULT_PROPS,
        ...initProps,

        tiles: populateTiles(
          initProps.layout,
          initProps.words,
          initProps.sequence,
        ),

        selectTile: (selectedTile: TileData) =>
          set(state => {
            const selectedTiles = [...state.selectedTiles, selectedTile];
            const selectedTileIds = new Set(selectedTiles.map(tile => tile.id));

            if (selectedTiles.length === 5) {
              const correct = checkAnswer(
                selectedTiles,
                initProps.sequence,
                state.wordOrder,
              );

              if (correct) {
                return {
                  selectedTiles: [],
                  tiles: state.tiles.filter(
                    tile => !selectedTileIds.has(tile.id),
                  ),
                  removedTiles: [...state.removedTiles, ...selectedTiles],
                  wordOrder: state.wordOrder + 1,
                };
              }

              return {
                selectedTiles: [],
              };
            }

            return {
              selectedTiles,
            };
          }),

        unselectTile: (tile: TileData) =>
          set(state => ({
            selectedTiles: state.selectedTiles.filter(
              selected => selected.id !== tile.id,
            ),
          })),

        clearSelection: () =>
          set({
            selectedTiles: [],
            removedTiles: [],
          }),
      }),
      {
        name: 'GameStore',
      },
    ),
  );
};

export default createGameStore;
export type { GameStore };
