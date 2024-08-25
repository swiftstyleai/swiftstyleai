import { HttpStatus } from '@/lib/constants';

import {
  handleSendingMessageFailure,
  handleSendingMessageRequest,
  handleSendingMessageSuccess,
} from './messages';
import {
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
} from '../constants';
import { type InitialPlaygroundState, type Message } from '../types';

describe('components/PlaygroundApp/contexts/reducer/messages', () => {
  let initialState: InitialPlaygroundState;

  beforeEach(() => {
    initialState = {
      fetchStatus: null,
      errors: null,
      list: [],
      data: {},
      users: {},
    };
  });

  describe('handleSendingMessageRequest', () => {
    const message: Message = {
      id: 'message-123',
      userId: 'user-456',
      message: 'Hello!',
    };

    test('should set fetchStatus to LOADING and update state with new message', () => {
      const action = {
        type: SEND_MESSAGE_REQUEST,
        payload: message,
      };

      const newState = handleSendingMessageRequest(initialState, action);

      expect(newState.fetchStatus).toBe(HttpStatus.LOADING);
      expect(newState.errors).toBeNull();
      expect(newState.list).toContain(message.id);
      expect(newState.data[message.id]).toEqual(message);
    });

    test('should return the initial state if action is undefined', () => {
      const newState = handleSendingMessageRequest(initialState, undefined);

      expect(newState).toEqual(initialState);
    });

    test('should return the initial state if action payload is undefined', () => {
      const action = {
        type: SEND_MESSAGE_REQUEST,
        payload: undefined,
      };

      const newState = handleSendingMessageRequest(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe('handleSendingMessageSuccess', () => {
    const message: Message = {
      id: 'message-123',
      userId: 'user-456',
      message: 'Hello!',
    };

    test('should set fetchStatus to LOADED and update state with new message', () => {
      const action = {
        type: SEND_MESSAGE_SUCCESS,
        payload: message,
      };

      const newState = handleSendingMessageSuccess(initialState, action);

      expect(newState.fetchStatus).toBe(HttpStatus.LOADED);
      expect(newState.errors).toBeNull();
      expect(newState.list).toContain(message.id);
      expect(newState.data[message.id]).toEqual(message);
    });

    test('should return the initial state if action is undefined', () => {
      const newState = handleSendingMessageSuccess(initialState, undefined);

      expect(newState).toEqual(initialState);
    });

    test('should return the initial state if action payload is undefined', () => {
      const action = {
        type: SEND_MESSAGE_SUCCESS,
        payload: undefined,
      };

      const newState = handleSendingMessageSuccess(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe('handleSendingMessageFailure', () => {
    const error = new Error('Network error');

    test('should set fetchStatus to FAILED and update errors with the provided payload', () => {
      const action = {
        type: SEND_MESSAGE_FAILURE,
        payload: error,
      };

      const newState = handleSendingMessageFailure(initialState, action);

      expect(newState.fetchStatus).toBe(HttpStatus.FAILED);
      expect(newState.errors).toEqual(error);
    });

    test('should return the initial state if action is undefined', () => {
      const newState = handleSendingMessageFailure(initialState, undefined);

      expect(newState).toEqual(initialState);
    });
  });
});
