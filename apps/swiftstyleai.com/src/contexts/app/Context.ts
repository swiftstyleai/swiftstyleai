'use client';

// https://stackoverflow.com/questions/57298149/react-ts-usecontext-usereducer-hook
import { type Dispatch, createContext } from 'react';

import { type InitialAppState } from './types';

export interface AppContext {
  state: InitialAppState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  openCreatingCharacterDrawer?: () => void;
  closeCreatingCharacterDrawer?: () => void;
  updateNavigation?: (state: boolean) => void;
}

const AppContext = createContext<AppContext>({
  state: {} as InitialAppState,
  dispatch: () => null, // Mock dispatch function
  // fetchCharactersRequest: () => void 0,
});

export default AppContext;
