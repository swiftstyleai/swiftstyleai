'use client';

// https://stackoverflow.com/questions/57298149/react-ts-usecontext-usereducer-hook
import { type Dispatch, createContext } from 'react';

import { type Character, type InitialCharactersPageState } from './types';

export interface CharactersContext {
  state: InitialCharactersPageState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  fetchCharactersRequest?: () => void;
  fetchCharactersSuccess?: (data: Character[]) => void;
  fetchCharactersFailure?: (err: any) => void;
  addCharacter?: (data: Character) => void;
  updateCharacter?: (data: Character) => void;
  deleteCharacter?: (characterId: string) => void;
}

const CharactersContext = createContext<CharactersContext>({
  state: {} as InitialCharactersPageState,
  dispatch: () => null, // Mock dispatch function
  // fetchCharactersRequest: () => void 0,
});

export default CharactersContext;
