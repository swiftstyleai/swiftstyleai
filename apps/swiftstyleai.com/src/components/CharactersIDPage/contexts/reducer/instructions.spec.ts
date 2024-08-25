import { HttpStatus } from '@/lib/constants';
import { type Action } from '@/lib/middlewares/types';

import {
  handleAddingInstruction,
  handleDeletingInstruction,
  handleFetchInstructionsRequest,
  handleFetchInstructionsSuccess,
} from './instructions';
import { type FetchInstructionsSuccessParams } from '../actions';
import {
  ADD_INSTRUCTION,
  DELETE_INSTRUCTION,
  FETCH_INSTRUCTIONS_REQUEST,
  FETCH_INSTRUCTIONS_SUCCESS,
} from '../constants';
import {
  type Character,
  type InitialCharactersIDPageState,
  type Instruction,
} from '../types';

describe('components/CharactersIDPage/contexts/reducer', () => {
  let initialState: InitialCharactersIDPageState;

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

  beforeEach(() => {
    initialState = {
      fetchStatus: null,
      errors: null,
      list: [],
      data: {},
      character: null,
      characterId: null,
    };
  });

  describe('handleFetchInstructionsRequest', () => {
    test('should handle fetch instructions request', () => {
      const action: Action<string> = {
        type: FETCH_INSTRUCTIONS_REQUEST,
        payload: character.id,
      };

      const newState = handleFetchInstructionsRequest(initialState, action);

      expect(newState.fetchStatus).toBe(HttpStatus.LOADING);
      expect(newState.errors).toBeNull();
      expect(newState.character).toBeNull();
      expect(newState.characterId).toBe(character.id);
    });

    test('should return the initial state if action is undefined', () => {
      const newState = handleFetchInstructionsRequest(initialState, undefined);

      expect(newState).toEqual(initialState);
    });

    test('should return the initial state if characterId is undefined', () => {
      const action: Action<string> = {
        type: FETCH_INSTRUCTIONS_REQUEST,
        payload: undefined,
      };

      const newState = handleFetchInstructionsRequest(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe('handleFetchInstructionsSuccess', () => {
    test('should handle fetch instructions success', () => {
      const instructions: Instruction[] = [
        {
          created_at: '2024-07-26T00:00:00Z',
          id: 'instruction-123',
          text: 'Sample instruction text',
          updated_at: '2024-07-26T12:00:00Z',
          user_id: 'user-456',
          character_id: 'style-789',
        },
        {
          created_at: '2024-07-26T00:00:00Z',
          id: 'instruction-124',
          text: 'Another sample instruction',
          updated_at: null,
          user_id: 'user-457',
          character_id: 'style-790',
        },
      ];
      const action: Action<FetchInstructionsSuccessParams> = {
        type: FETCH_INSTRUCTIONS_SUCCESS,
        payload: { instructions, character },
      };

      const newState = handleFetchInstructionsSuccess(initialState, action);

      expect(newState.fetchStatus).toBe(HttpStatus.LOADED);
      expect(newState.errors).toBeNull();
      expect(newState.list).toEqual(['instruction-123', 'instruction-124']);
      expect(newState.data).toEqual({
        'instruction-123': instructions[0],
        'instruction-124': instructions[1],
      });
      expect(newState.character).toEqual(character);
    });

    test('should return the initial state if action is undefined', () => {
      const newState = handleFetchInstructionsSuccess(initialState, undefined);

      expect(newState).toEqual(initialState);
    });

    test('should return the initial state if instructions or character are undefined', () => {
      const action: Action<FetchInstructionsSuccessParams> = {
        type: FETCH_INSTRUCTIONS_SUCCESS,
        payload: { instructions: null, character: null },
      };

      const newState = handleFetchInstructionsSuccess(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe('handleAddingInstruction', () => {
    test('should handle adding a new instruction', () => {
      const instruction: Instruction = {
        created_at: '2024-07-26T00:00:00Z',
        id: 'instruction-123',
        text: 'Sample instruction text',
        updated_at: '2024-07-26T12:00:00Z',
        user_id: 'user-456',
        character_id: 'style-789',
      };
      const action: Action<Instruction> = {
        type: ADD_INSTRUCTION,
        payload: instruction,
      };

      const newState = handleAddingInstruction(initialState, action);

      expect(newState.fetchStatus).toBe(HttpStatus.LOADED);
      expect(newState.errors).toBeNull();
      expect(newState.list).toEqual(['instruction-123']);
      expect(newState.data).toEqual({
        'instruction-123': instruction,
      });
    });

    test('should handle updating an existing instruction', () => {
      const existingInstruction: Instruction = {
        created_at: '2024-07-26T00:00:00Z',
        id: 'instruction-123',
        text: 'Old instruction text',
        updated_at: '2024-07-26T12:00:00Z',
        user_id: 'user-456',
        character_id: 'style-789',
      };
      const instruction: Instruction = {
        created_at: '2024-07-26T00:00:00Z',
        id: 'instruction-123',
        text: 'Updated instruction text',
        updated_at: '2024-07-26T12:00:00Z',
        user_id: 'user-456',
        character_id: 'style-789',
      };
      const action: Action<Instruction> = {
        type: ADD_INSTRUCTION,
        payload: instruction,
      };

      const existingState: InitialCharactersIDPageState = {
        ...initialState,
        list: ['instruction-123'],
        data: {
          'instruction-123': existingInstruction,
        },
      };

      const newState = handleAddingInstruction(existingState, action);

      expect(newState.fetchStatus).toBe(HttpStatus.LOADED);
      expect(newState.errors).toBeNull();
      expect(newState.list).toEqual(['instruction-123']);
      expect(newState.data).toEqual({
        'instruction-123': instruction,
      });
    });

    test('should return the initial state if action is undefined', () => {
      const newState = handleAddingInstruction(initialState, undefined);

      expect(newState).toEqual(initialState);
    });

    test('should return the initial state if instruction is undefined', () => {
      const action: Action<Instruction> = {
        type: ADD_INSTRUCTION,
        payload: undefined,
      };

      const newState = handleAddingInstruction(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe('handleDeletingInstruction', () => {
    test('should handle deleting instruction', () => {
      const initialStateWithInstruction: InitialCharactersIDPageState = {
        ...initialState,
        list: ['instruction-123'],
        data: {
          'instruction-123': {
            created_at: '2024-07-26T00:00:00Z',
            id: 'instruction-123',
            text: 'Sample instruction text',
            updated_at: '2024-07-26T12:00:00Z',
            user_id: 'user-456',
            character_id: 'style-789',
          },
        },
      };

      const action: Action<string> = {
        type: DELETE_INSTRUCTION,
        payload: 'instruction-123',
      };

      const newState = handleDeletingInstruction(
        initialStateWithInstruction,
        action
      );

      expect(newState.fetchStatus).toBe(HttpStatus.LOADED);
      expect(newState.errors).toBeNull();
      expect(newState.list).toEqual([]);
      expect(newState.data).toEqual({});
    });

    test('should return the initial state if action is undefined', () => {
      const newState = handleDeletingInstruction(initialState, undefined);

      expect(newState).toEqual(initialState);
    });

    test('should return the initial state if instructionId is undefined', () => {
      const action: Action<string> = {
        type: DELETE_INSTRUCTION,
        payload: undefined,
      };

      const newState = handleDeletingInstruction(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });
});
