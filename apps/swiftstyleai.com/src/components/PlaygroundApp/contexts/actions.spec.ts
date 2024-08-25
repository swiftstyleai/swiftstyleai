import {
  sendMessageFailure,
  sendMessageRequest,
  sendMessageSuccess,
} from './actions';
import {
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
} from './constants';
import { type Message } from './types';

// Helper function to create an expected action
const createExpectedAction = (type, payload) => ({ type, payload });

// Sample data
const sampleMessage: Message = {
  id: 'message-123',
  message: 'Hello, world!',
  userId: 'user-1',
};

const sampleError = new Error('Something went wrong');

describe('components/PlaygroundApp/contexts/actions', () => {
  describe('sendMessageRequest', () => {
    it('should create a SEND_MESSAGE_REQUEST action with the correct payload', () => {
      const expectedAction = createExpectedAction(
        SEND_MESSAGE_REQUEST,
        sampleMessage
      );
      const action = sendMessageRequest(sampleMessage);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('sendMessageSuccess', () => {
    it('should create a SEND_MESSAGE_SUCCESS action with the correct payload', () => {
      const expectedAction = createExpectedAction(
        SEND_MESSAGE_SUCCESS,
        sampleMessage
      );
      const action = sendMessageSuccess(sampleMessage);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('sendMessageFailure', () => {
    it('should create a SEND_MESSAGE_FAILURE action with the correct payload and error flag', () => {
      const expectedAction = {
        type: SEND_MESSAGE_FAILURE,
        payload: sampleError,
        error: true,
      };
      const action = sendMessageFailure(sampleError);
      expect(action).toEqual(expectedAction);
    });
  });
});
