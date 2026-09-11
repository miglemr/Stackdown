import Letter from './Letter';
import type { TileData } from '../types/game';
import { useGameStore } from '../store/gameStore';

type TileProps = {
  tile: TileData;
};

function Tile({ tile }: TileProps) {
  const selectTile = useGameStore(state => state.selectTile);
  const removedTiles = useGameStore(state => state.removedTiles);
  const blocked = tile.blockedBy.some(id => !removedTiles.includes(id));

  if (removedTiles.includes(tile.id)) {
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
      onClick={() => selectTile(tile.id)}
    >
      <Letter letter={tile.letter} />
    </button>
  );
}

export default Tile;
