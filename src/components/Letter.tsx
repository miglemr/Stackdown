import type { LetterData } from '../types/game';

type LetterProps = {
  letter: LetterData;
};

function Letter({ letter }: LetterProps) {
  return <span className="letter">{letter.value}</span>;
}

export default Letter;
