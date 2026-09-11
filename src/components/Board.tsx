import type { TileData } from '../types/game';
import Tile from './Tile';

type BoardProps = {
  tiles: TileData[];
};

function Board({ tiles }: BoardProps) {
  return (
    <div className="board">
      {tiles.map(tile => (
        <Tile key={tile.id} tile={tile} />
      ))}
    </div>
  );
}

export default Board;
