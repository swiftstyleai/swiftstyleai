import { HttpStatus } from '@/lib/constants';
import { type Action } from '@/lib/middlewares/types';

import { type InitialPlaygroundState, type Message } from '../types';

export const handleSendingMessageRequest = (
  state: InitialPlaygroundState,
  action: Action<Message> | undefined
): InitialPlaygroundState => {
  if (!action || !action.payload) {
    return state;
  }

  const message = action.payload;
  const { list, data } = state;

  // Determine if the message is new
  const isNewMessage = !data[message.id];

  // Create new list and data with the message added or updated
  const newList = isNewMessage ? [...list, message.id] : list;
  const newData = {
    ...data,
    [message.id]: message,
  };

  return {
    ...state,
    fetchStatus: HttpStatus.LOADING,
    errors: null,
    list: newList,
    data: newData,
  };
};

export const handleSendingMessageSuccess = (
  state: InitialPlaygroundState,
  action: Action<Message> | undefined
): InitialPlaygroundState => {
  if (!action || !action.payload) {
    return state;
  }

  const message = action.payload;
  const { list, data } = state;

  // Determine if the message is new
  const isNewMessage = !data[message.id];

  // Create new list and data with the message added or updated
  const newList = isNewMessage ? [...list, message.id] : list;
  const newData = {
    ...data,
    [message.id]: message,
  };

  return {
    ...state,
    fetchStatus: HttpStatus.LOADED,
    errors: null,
    list: newList,
    data: newData,
  };
};

export const handleSendingMessageFailure = (
  state: InitialPlaygroundState,
  action: Action<any> | undefined
): InitialPlaygroundState => {
  if (!action) {
    return state;
  }

  return {
    ...state,
    fetchStatus: HttpStatus.FAILED,
    errors: action.payload,
  };
};
