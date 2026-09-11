import { createContext } from 'react';
import type { GameStore } from './createGameStore';

export const GameContext = createContext<GameStore | null>(null);
