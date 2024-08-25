import {
  fetchCharactersFailure,
  fetchCharactersRequest,
  fetchCharactersSuccess,
} from './actions';
import {
  FETCH_CHARACTERS_FAILURE,
  FETCH_CHARACTERS_REQUEST,
  FETCH_CHARACTERS_SUCCESS,
} from './constants';

// Helper function to create an expected action
const createExpectedAction = (type, payload) => ({ type, payload });

describe('components/DashboardPage/contexts/actions', () => {
  describe('fetchCharactersRequest', () => {
    it('should create a FETCH_CHARACTERS_REQUEST action', () => {
      const expectedAction = createExpectedAction(FETCH_CHARACTERS_REQUEST);

      const action = fetchCharactersRequest();

      expect(action).toEqual(expectedAction);
    });
  });

  describe('fetchCharactersSuccess', () => {
    let characters;

    beforeEach(() => {
      characters = [
        {
          created_at: '2024-07-26T00:00:00Z',
          description: 'Style description 1',
          id: 'style-123',
          is_active: true,
          is_default: false,
          name: 'Style 1',
          sharing: 'public',
          updated_at: '2024-07-26T12:00:00Z',
          user_id: 'user-456',
        },
        {
          created_at: '2024-07-26T00:00:00Z',
          description: 'Style description 2',
          id: 'style-124',
          is_active: true,
          is_default: false,
          name: 'Style 2',
          sharing: 'private',
          updated_at: '2024-07-26T12:00:00Z',
          user_id: 'user-457',
        },
      ];
    });

    it('should create a FETCH_CHARACTERS_SUCCESS action with the correct payload', () => {
      const expectedAction = createExpectedAction(
        FETCH_CHARACTERS_SUCCESS,
        characters
      );

      const action = fetchCharactersSuccess(characters);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('fetchCharactersFailure', () => {
    const errorMessages = [
      {
        error: new Error('Failed to fetch characters'),
        description: 'Error object',
      },
      {
        error: 'Failed to fetch characters',
        description: 'String error message',
      },
      {
        error: { message: 'Failed to fetch characters', code: 500 },
        description: 'Error object with code',
      },
    ];

    errorMessages.forEach(({ error, description }) => {
      it(`should create a FETCH_CHARACTERS_FAILURE action with the correct payload for ${description}`, () => {
        const expectedAction = createExpectedAction(
          FETCH_CHARACTERS_FAILURE,
          error
        );
        expectedAction.error = true;

        const action = fetchCharactersFailure(error);

        expect(action).toEqual(expectedAction);
      });
    });
  });
});
