import { type Action } from '@/lib/middlewares/types';

import { handleUpdatingCharacter } from './characters';
import { type Character, type InitialCharactersIDPageState } from '../types';

describe('components/CharactersIDPage/contexts/reducer', () => {
  describe('handleUpdatingCharacter', () => {
    let initialState: InitialCharactersIDPageState;

    beforeEach(() => {
      initialState = {
        fetchStatus: null,
        errors: null,
        list: [],
        data: {},
        character: null,
        characterId: null,
        // Add any other initial state properties here
      };
    });

    test('should update the character and characterId', () => {
      const character: Character = {
        id: '123',
        name: 'Test Character',
        description: 'A test character description',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: null,
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

      expect(newState.character).toEqual(character);
      expect(newState.characterId).toBe(character.id);
    });

    test('should return the initial state if action is undefined', () => {
      const newState = handleUpdatingCharacter(initialState, undefined);

      expect(newState).toEqual(initialState);
    });

    test('should return the initial state if action payload is undefined', () => {
      const action: Action<Character> = {
        type: 'UPDATE_CHARACTER',
        payload: undefined,
      };

      const newState = handleUpdatingCharacter(initialState, action);

      expect(newState).toEqual(initialState);
    });

    test('should return the initial state if character in payload is undefined', () => {
      const action: Action<Character> = {
        type: 'UPDATE_CHARACTER',
        payload: null,
      };

      const newState = handleUpdatingCharacter(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });
});
