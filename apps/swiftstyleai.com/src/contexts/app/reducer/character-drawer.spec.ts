import {
  handleCharacterCreationDrawerClose,
  handleCharacterCreationDrawerOpen,
} from './character-drawer';
import { generateInitialState } from './index';
import { type InitialAppState } from '../types';

describe('contexts/app/reducer/character-drawer', () => {
  let initialState: InitialAppState;

  beforeEach(() => {
    initialState = generateInitialState();
  });

  test('should open the creating character drawer', () => {
    const newState = handleCharacterCreationDrawerOpen(initialState);

    expect(newState.creatingCharacterDrawer.open).toBe(true);
    // Ensure other state properties remain unchanged if necessary
    expect(newState).toEqual({
      ...initialState,
      creatingCharacterDrawer: {
        ...initialState.creatingCharacterDrawer,
        open: true,
      },
    });
  });

  test('should close the creating character drawer', () => {
    // First, set the drawer to open
    initialState.creatingCharacterDrawer.open = true;
    const newState = handleCharacterCreationDrawerClose(initialState);

    expect(newState.creatingCharacterDrawer.open).toBe(false);
    // Ensure other state properties remain unchanged if necessary
    expect(newState).toEqual({
      ...initialState,
      creatingCharacterDrawer: {
        ...initialState.creatingCharacterDrawer,
        open: false,
      },
    });
  });
});
