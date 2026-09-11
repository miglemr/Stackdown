import { useState } from 'react';
import './App.css';
import createGameStore from './store/createGameStore';
import { GameContext } from './store/GameContext';
import Board from './components/Board';
import layout from './game/layout';
import words from './data/words';
import sequence from './data/sequence';
import WordSlots from './components/WordSlots';

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
      <WordSlots />
    </GameContext.Provider>
  );
}

export default App;
