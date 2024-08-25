import {
  addInstruction,
  deleteInstruction,
  fetchInstructionsRequest,
} from './actions';
import {
  ADD_INSTRUCTION,
  DELETE_INSTRUCTION,
  FETCH_INSTRUCTIONS_REQUEST,
} from './constants';
import { type Instruction } from './types';

// Helper function to create an expected action
const createExpectedAction = (type, payload) => ({ type, payload });

describe('components/CharactersIDPage/contexts/actions', () => {
  describe('fetchInstructionsRequest', () => {
    const characterIds = [
      { id: 'style-123', description: 'valid characterId' },
      { id: '', description: 'empty characterId' },
      { id: '12345', description: 'numeric characterId' },
      { id: null, description: 'null characterId' },
      { id: undefined, description: 'undefined characterId' },
    ];

    characterIds.forEach(({ id, description }) => {
      it(`should create a FETCH_INSTRUCTIONS_REQUEST action with the ${description}`, () => {
        // Define the expected action
        const expectedAction = createExpectedAction(
          FETCH_INSTRUCTIONS_REQUEST,
          id
        );

        // Invoke the function with the payload
        const action = fetchInstructionsRequest(id);

        // Assert that the returned action matches the expected action
        expect(action).toEqual(expectedAction);
      });
    });
  });

  describe('addInstruction', () => {
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
      {
        created_at: '2024-07-26T00:00:00Z',
        id: 'instruction-125',
        text: '',
        updated_at: '2024-07-26T12:00:00Z',
        user_id: 'user-458',
        character_id: 'style-791',
      },
      {
        created_at: '',
        id: '',
        text: '',
        updated_at: null,
        user_id: '',
        character_id: '',
      },
    ];

    instructions.forEach((instruction, index) => {
      it(`should create an ADD_INSTRUCTION action with the correct payload for instruction ${
        index + 1
      }`, () => {
        // Define the expected action
        const expectedAction = createExpectedAction(
          ADD_INSTRUCTION,
          instruction
        );

        // Invoke the function with the payload
        const action = addInstruction(instruction);

        // Assert that the returned action matches the expected action
        expect(action).toEqual(expectedAction);
      });
    });
  });

  describe('deleteInstruction', () => {
    it('should create a DELETE_INSTRUCTION action with the correct payload', () => {
      // Define the payload
      const instructionId = 'instruction-123';

      // Define the expected action
      const expectedAction = {
        type: DELETE_INSTRUCTION,
        payload: instructionId,
      };

      // Invoke the action creator with the payload
      const action = deleteInstruction(instructionId);

      // Assert that the returned action matches the expected action
      expect(action).toEqual(expectedAction);
    });
  });
});
