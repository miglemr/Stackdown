import { useContext } from 'react';
import { useStore } from 'zustand';
import Tile from './Tile';
import { GameContext } from '../store/GameContext';

function Board() {
  const store = useContext(GameContext);
  if (!store) throw new Error('Missing GameContext.Provider in the tree');

  const tiles = useStore(store, state => state.tiles);

  return (
    <div className="board">
      {tiles.map(tile => (
        <Tile key={tile.id} tile={tile} />
      ))}
    </div>
  );
}

export default Board;
