'use client';

// https://stackoverflow.com/questions/57298149/react-ts-usecontext-usereducer-hook
import { type Dispatch, createContext } from 'react';

import { type Character, type InitialDashboardState } from './types';

export interface DashboardContext {
  state: InitialDashboardState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  fetchCharactersRequest?: () => void;
  fetchCharactersSuccess?: (data: Character[]) => void;
  fetchCharactersFailure?: (err: any) => void;
  addCharacter?: (data: Character) => void;
}

const DashboardContext = createContext<DashboardContext>({
  state: {} as InitialDashboardState,
  dispatch: () => null, // Mock dispatch function
  // fetchCharactersRequest: () => void 0,
});

export default DashboardContext;
