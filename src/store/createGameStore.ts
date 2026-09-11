import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { LayoutData, TileData } from '../types/game';
import populateTiles from '../game/populateTiles';

interface GameProps {
  tiles: TileData[];
  selectedTiles: TileData[];
  removedTiles: TileData[];
}

interface InitPrpops {
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

const createGameStore = (initProps: InitPrpops) => {
  const DEFAULT_PROPS: GameProps = {
    tiles: [],
    selectedTiles: [],
    removedTiles: [],
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

        selectTile: (tile: TileData) =>
          set(state => ({
            selectedTiles: [...state.selectedTiles, tile],
          })),

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
