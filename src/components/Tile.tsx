import Letter from './Letter';
import type { TileData } from '../types/game';
import { useGameStore } from '../store/gameStore';

type TileProps = {
  tile: TileData;
};

function Tile({ tile }: TileProps) {
  const selectTile = useGameStore(state => state.selectTile);
  const removed = useGameStore(state => state.removedTiles.includes(tile.id));

  if (removed) {
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
      onClick={() => selectTile(tile.id)}
    >
      <Letter letter={tile.letter} />
    </button>
  );
}

export default Tile;
