import { type InitialAppState } from '../types';

export const handleCharacterCreationDrawerOpen = (
  state: InitialAppState
): InitialAppState => ({
  ...state,
  creatingCharacterDrawer: {
    open: true,
  },
});

export const handleCharacterCreationDrawerClose = (
  state: InitialAppState
): InitialAppState => ({
  ...state,
  creatingCharacterDrawer: {
    open: false,
  },
});
