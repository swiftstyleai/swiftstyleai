'use client';

// https://stackoverflow.com/questions/57298149/react-ts-usecontext-usereducer-hook
import { type Dispatch, createContext } from 'react';

import { type FetchInstructionsSuccessParams } from './actions';
import {
  type Character,
  type InitialCharactersIDPageState,
  type Instruction,
} from './types';

export interface CharactersIDContext {
  state: InitialCharactersIDPageState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  fetchInstructionsRequest?: (taskid: string) => void;
  fetchInstructionsSuccess?: (data: FetchInstructionsSuccessParams) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchInstructionsFailure?: (error: any) => void;
  addInstruction?: (data: Instruction) => void;
  deleteInstruction?: (id: string) => void;
  updateCharacter?: (data: Character) => void;
}

const CharactersIDContext = createContext<CharactersIDContext>({
  state: {} as InitialCharactersIDPageState,
  dispatch: () => null, // Mock dispatch function
});

export default CharactersIDContext;
