'use client';

// https://stackoverflow.com/questions/57298149/react-ts-usecontext-usereducer-hook
import { type Dispatch, createContext } from 'react';

import { type Character, type DeletingCharacterDialogState } from './types';

export interface DeletingCharacterDialogContext {
  state: DeletingCharacterDialogState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  openDeletingCharacterDialog?: (character: Character) => void;
  closeDeletingCharacterDialog?: () => void;
  sendDeletingCharacterRequest?: () => void;
  sendDeletingCharacterSuccess?: () => void;
  sendDeletingCharacterFailure?: (error: any) => void;
}

export const DeletingCharacterDialogContext =
  createContext<DeletingCharacterDialogContext>({
    state: {} as DeletingCharacterDialogState,
    dispatch: () => null, // Mock dispatch function
  });
