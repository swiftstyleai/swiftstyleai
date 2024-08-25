import {
  closeDeletingCharacterDialog,
  openDeletingCharacterDialog,
  sendDeletingCharacterFailure,
  sendDeletingCharacterRequest,
  sendDeletingCharacterSuccess,
} from './actions';
import {
  CLOSE_DELETING_CHARACTER_DIALOG,
  OPEN_DELETING_CHARACTER_DIALOG,
  SEND_DELETING_CHARACTER_FAILURE,
  SEND_DELETING_CHARACTER_REQUEST,
  SEND_DELETING_CHARACTER_SUCCESS,
} from './constants';

describe('components/DeletingCharacterDialog/actions', () => {
  describe('openDeletingCharacterDialog', () => {
    it('should create an OPEN_DELETING_CHARACTER_DIALOG action', () => {
      const character = {
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

      const expectedAction = {
        type: OPEN_DELETING_CHARACTER_DIALOG,
        payload: character,
      };

      const action = openDeletingCharacterDialog(character);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('closeDeletingCharacterDialog', () => {
    it('should create a CLOSE_DELETING_CHARACTER_DIALOG action', () => {
      const expectedAction = {
        type: CLOSE_DELETING_CHARACTER_DIALOG,
      };

      const action = closeDeletingCharacterDialog();

      expect(action).toEqual(expectedAction);
    });
  });

  describe('sendDeletingCharacterRequest', () => {
    it('should create a SEND_DELETING_CHARACTER_REQUEST action', () => {
      const expectedAction = {
        type: SEND_DELETING_CHARACTER_REQUEST,
      };

      const action = sendDeletingCharacterRequest();

      expect(action).toEqual(expectedAction);
    });
  });

  describe('sendDeletingCharacterSuccess', () => {
    it('should create a SEND_DELETING_CHARACTER_SUCCESS action', () => {
      const expectedAction = {
        type: SEND_DELETING_CHARACTER_SUCCESS,
      };

      const action = sendDeletingCharacterSuccess();

      expect(action).toEqual(expectedAction);
    });
  });

  describe('sendDeletingCharacterFailure', () => {
    it('should create a SEND_DELETING_CHARACTER_FAILURE action with an error payload', () => {
      const error = new Error('Test error');
      const expectedAction = {
        type: SEND_DELETING_CHARACTER_FAILURE,
        payload: error,
        error: true,
      };

      const action = sendDeletingCharacterFailure(error);

      expect(action).toEqual(expectedAction);
    });
  });
});
