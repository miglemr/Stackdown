import { memo, useContext } from 'react';
import { useStore } from 'zustand';
import Letter from './Letter';
import type { TileData } from '../types/game';
import { GameContext } from '../store/GameContext';

type TileProps = {
  tile: TileData;
};

function Tile({ tile }: TileProps) {
  const store = useContext(GameContext);

  if (!store) {
    throw new Error('Missing GameContext.Provider in the tree');
  }

  const selectTile = useStore(store, state => state.selectTile);

  const selected = useStore(store, state =>
    state.selectedTiles.some(selectedTile => selectedTile.id === tile.id),
  );

  const blocked = useStore(store, state => {
    const selectedIds = new Set(
      state.selectedTiles.map(selectedTile => selectedTile.id),
    );

    const removedIds = new Set(
      state.removedTiles.map(removedTile => removedTile.id),
    );

    return tile.blockedBy.some(
      id => !selectedIds.has(id) && !removedIds.has(id),
    );
  });

  if (selected) {
    return null;
  }

  return (
    <button
      className="tile"
      style={{
        left: tile.x,
        top: tile.y,
        zIndex: tile.zIndex,
      }}
      disabled={blocked}
      onClick={() => selectTile(tile)}
    >
      <Letter letter={tile.letter} />
    </button>
  );
}

export default memo(Tile);
