import { create, type StateCreator } from 'zustand';
import zukeeper from 'zukeeper';

type GameState = {
  selectedTiles: number[];
  removedTiles: number[];

  selectTile: (tileId: number) => void;
  clearSelection: () => void;
};

const gameStore: StateCreator<GameState> = set => ({
  selectedTiles: [],
  removedTiles: [],

  selectTile: (tileId: number) =>
    set(state => ({
      selectedTiles: [...state.selectedTiles, tileId],
      removedTiles: [...state.removedTiles, tileId],
    })),

  clearSelection: () =>
    set({
      selectedTiles: [],
      removedTiles: [],
    }),
});

export const useGameStore = create<GameState>()(zukeeper(gameStore));

/* eslint-disable */
(window as any).store = useGameStore;
