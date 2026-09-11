import './App.css';
import Board from './components/Board';
import layout from './game/layout';
import sequence from './data/sequence';
import words from './data/words';
import populateTiles from './game/populateTiles';

function App() {
  const tiles = populateTiles(layout, words, sequence);

  return (
    <div>
      <h1>Stackdown 😎</h1>

      <Board tiles={tiles} />
    </div>
  );
}

export default App;
