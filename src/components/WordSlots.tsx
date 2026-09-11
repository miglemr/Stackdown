import { GameContext } from '../store/GameContext';
import { useContext } from 'react';
import { useStore } from 'zustand';
import Letter from './Letter';
import type { TileData } from '../types/game';

function WordSlots() {
  const store = useContext(GameContext);

  if (!store) throw new Error('Missing GameContext.Provider in the tree');

  const selectedTiles = useStore(store, s => s.selectedTiles);
  const unselectTile = useStore(store, s => s.unselectTile);

  const onClick = (tile?: TileData) => {
    if (!tile) return;

    const index = selectedTiles.findIndex(
      selectedTile => selectedTile.id === tile.id,
    );

    if (index === -1) return;

    for (let i = index; i < selectedTiles.length; i++) {
      unselectTile(selectedTiles[i]);
    }
  };

  return (
    <div className="word-slots">
      {Array.from({ length: 5 }, (_, index) => {
        const tile = selectedTiles[index];

        return (
          <button className="slot" key={index} onClick={() => onClick(tile)}>
            {tile && <Letter letter={tile.letter} />}
          </button>
        );
      })}
    </div>
  );
}

export default WordSlots;
