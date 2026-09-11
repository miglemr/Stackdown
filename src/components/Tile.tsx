import Letter from './Letter';
import type { TileData } from '../types/game';
import { GameContext } from '../store/GameContext';
import { useContext } from 'react';
import { useStore } from 'zustand';

type TileProps = {
  tile: TileData;
};

function Tile({ tile }: TileProps) {
  const store = useContext(GameContext);

  if (!store) throw new Error('Missing GameContext.Provider in the tree');

  const selectTile = useStore(store, s => s.selectTile);
  const selectedTiles = useStore(store, s => s.selectedTiles);
  const blocked = tile.blockedBy.some(
    id => !selectedTiles.some(selectedTile => selectedTile.id === id),
  );

  if (selectedTiles.some(selectedTile => selectedTile.id === tile.id)) {
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

export default Tile;
