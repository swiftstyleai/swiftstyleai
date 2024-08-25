import {
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
} from './constants';
import { type Message } from './types';

export const sendMessageRequest = (data: Message) => ({
  type: SEND_MESSAGE_REQUEST,
  payload: data,
});

export const sendMessageSuccess = (data: Message) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: data,
});

// MulticallErrorType
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendMessageFailure = (error: any) => ({
  type: SEND_MESSAGE_FAILURE,
  payload: error,
  error: true,
});
