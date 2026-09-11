import { useState } from 'react';
import './App.css';
import createGameStore from './store/createGameStore';
import { GameContext } from './store/GameContext';
import Board from './components/Board';
import layout from './game/layout';
import words from './data/words';
import sequence from './data/sequence';

function App() {
  const initProps = {
    layout,
    words,
    sequence,
  };
  const [store] = useState(() => createGameStore(initProps));

  return (
    <GameContext.Provider value={store}>
      <Board />
    </GameContext.Provider>
  );
}

export default App;
