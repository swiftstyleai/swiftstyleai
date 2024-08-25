import { HttpStatus } from '@/lib/constants';
import { type Action } from '@/lib/middlewares/types';

import {
  handleFetchCharactersRequest,
  handleFetchCharactersSuccess,
  handleUpdatingCharacter,
} from './characters';
import { FETCH_CHARACTERS_SUCCESS } from '../constants';
import { type Character, type InitialCharactersPageState } from '../types';

describe('components/CharactersPage/contexts/reducer/characters', () => {
  let initialState: InitialCharactersPageState;

  beforeEach(() => {
    initialState = {
      fetchStatus: null,
      errors: null,
      list: [],
      data: {},
    };
  });

  test('should handle fetch characters request', () => {
    const newState = handleFetchCharactersRequest(initialState);

    expect(newState.fetchStatus).toBe(HttpStatus.LOADING);
    expect(newState.errors).toBeNull();
    // Ensure other state properties remain unchanged
    expect(newState).toEqual({
      ...initialState,
      fetchStatus: HttpStatus.LOADING,
      errors: null,
    });
  });

  test('should handle fetch characters success', () => {
    const characters: Character[] = [
      {
        id: '1',
        name: 'Character 1',
        description: 'Description 1',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: null,
        is_active: true,
        is_default: false,
        sharing: 'private',
        user_id: 'user1',
      },
      {
        id: '2',
        name: 'Character 2',
        description: 'Description 2',
        created_at: '2024-01-02T00:00:00Z',
        updated_at: null,
        is_active: true,
        is_default: false,
        sharing: 'private',
        user_id: 'user2',
      },
    ];
    const action: Action<Character[]> = {
      type: FETCH_CHARACTERS_SUCCESS,
      payload: characters,
    };

    const newState = handleFetchCharactersSuccess(initialState, action);

    expect(newState.fetchStatus).toBe(HttpStatus.LOADED);
    expect(newState.errors).toBeNull();
    expect(newState.list).toEqual(['1', '2']);
    expect(newState.data).toEqual({
      '1': characters[0],
      '2': characters[1],
    });
    // Ensure other state properties remain unchanged
    expect(newState).toEqual({
      ...initialState,
      fetchStatus: HttpStatus.LOADED,
      errors: null,
      list: ['1', '2'],
      data: {
        '1': characters[0],
        '2': characters[1],
      },
    });
  });

  test('should handle fetch characters success with undefined action', () => {
    const newState = handleFetchCharactersSuccess(initialState, undefined);

    // Ensure state remains unchanged
    expect(newState).toEqual(initialState);
  });

  test('should handle fetch characters success with null characters', () => {
    const action: Action<Character[]> = {
      type: FETCH_CHARACTERS_SUCCESS,
      payload: null,
    };

    const newState = handleFetchCharactersSuccess(initialState, action);

    // Ensure state remains unchanged
    expect(newState).toEqual(initialState);
  });

  test('should update character in state when valid action is provided', () => {
    const character: Character = {
      id: '1',
      name: 'Updated Character',
      description: 'Updated Description',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-05T00:00:00Z',
      is_active: true,
      is_default: false,
      sharing: 'private',
      user_id: 'user1',
    };

    const action: Action<Character> = {
      type: 'UPDATE_CHARACTER',
      payload: character,
    };

    const newState = handleUpdatingCharacter(initialState, action);

    expect(newState.data['1']).toEqual(character);
  });

  test('should return the same state if action is undefined', () => {
    const newState = handleUpdatingCharacter(initialState, undefined);

    expect(newState).toEqual(initialState);
  });

  test('should return the same state if action payload is undefined', () => {
    const action: Action<Character> = {
      type: 'UPDATE_CHARACTER',
      payload: undefined,
    };

    const newState = handleUpdatingCharacter(initialState, action);

    expect(newState).toEqual(initialState);
  });

  test('should return the same state if action payload is null', () => {
    const action: Action<Character> = {
      type: 'UPDATE_CHARACTER',
      payload: null,
    };

    const newState = handleUpdatingCharacter(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
