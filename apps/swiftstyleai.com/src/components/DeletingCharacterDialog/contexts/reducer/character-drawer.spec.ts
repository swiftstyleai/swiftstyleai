import { HttpStatus } from '@/lib/constants';
import { type Action } from '@/lib/middlewares/types';

import {
  handleCharacterDeletionDrawerClose,
  handleCharacterDeletionDrawerOpen,
  handleCharacterDeletionFailure,
  handleCharacterDeletionRequest,
  handleCharacterDeletionSuccess,
} from './character-drawer';
import { generateInitialState } from './index';
import {
  SEND_DELETING_CHARACTER_FAILURE,
  SEND_DELETING_CHARACTER_REQUEST,
} from '../constants';
import { type Character, type DeletingCharacterDialogState } from '../types';

describe('components/DeletingCharacterDialog/reducer/character-drawer', () => {
  let initialState: DeletingCharacterDialogState;

  beforeEach(() => {
    initialState = generateInitialState();
  });

  test('should open the deleting character drawer', () => {
    const character: Character = {
      id: '123',
      name: 'Test Character',
      description: 'A character for testing',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: null,
      is_active: true,
      is_default: false,
      sharing: 'private',
      user_id: 'user123',
    };

    const action: Action<Character> = {
      type: SEND_DELETING_CHARACTER_REQUEST,
      payload: character,
    };

    const newState = handleCharacterDeletionDrawerOpen(initialState, action);

    expect(newState.open).toBe(true);
    expect(newState.character).toEqual(character);
    // Ensure other state properties remain unchanged if necessary
    expect(newState).toEqual({
      ...initialState,
      open: true,
      character,
    });
  });

  test('should close the deleting character drawer', () => {
    initialState.open = true;
    const newState = handleCharacterDeletionDrawerClose(initialState);

    expect(newState.open).toBe(false);
    // Ensure other state properties remain unchanged if necessary
    expect(newState).toEqual({
      ...initialState,
      open: false,
    });
  });

  test('should handle character deletion request', () => {
    const newState = handleCharacterDeletionRequest(initialState);

    expect(newState.fetchStatus).toBe(HttpStatus.LOADING);
    expect(newState.errors).toBeNull();
    // Ensure other state properties remain unchanged
    expect(newState).toEqual({
      ...initialState,
      fetchStatus: HttpStatus.LOADING,
      errors: null,
    });
  });

  test('should handle character deletion success', () => {
    const newState = handleCharacterDeletionSuccess(initialState);

    expect(newState.fetchStatus).toBe(HttpStatus.LOADED);
    expect(newState.errors).toBeNull();
    // Ensure other state properties remain unchanged
    expect(newState).toEqual({
      ...initialState,
      fetchStatus: HttpStatus.LOADED,
      errors: null,
    });
  });

  test('should handle character deletion failure', () => {
    const error = new Error('Test error');
    const action: Action<any> = {
      type: SEND_DELETING_CHARACTER_FAILURE,
      payload: error,
      error: true,
    };

    const newState = handleCharacterDeletionFailure(initialState, action);

    expect(newState.fetchStatus).toBe(HttpStatus.FAILED);
    expect(newState.errors).toEqual(error);
    // Ensure other state properties remain unchanged
    expect(newState).toEqual({
      ...initialState,
      fetchStatus: HttpStatus.FAILED,
      errors: error,
    });
  });
});
