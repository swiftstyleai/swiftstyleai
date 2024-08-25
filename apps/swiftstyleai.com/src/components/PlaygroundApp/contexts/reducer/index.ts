// https://github.com/redux-utilities/redux-actions/blob/master/src/handleAction.js
// https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#creating-the-root-reducer
import Debug from 'debug';

import { createReducer } from '@/lib/middlewares';

import { siteConfig } from '@/constant/config';

import {
  handleSendingMessageRequest,
  handleSendingMessageSuccess,
} from './messages';
import {
  LOGO_APP,
  LOGO_USER,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
} from '../constants';
import { type InitialPlaygroundState } from '../types';

const debug = Debug('components:PlaygroundApp:contexts:reducer');

export function generateInitialState(): InitialPlaygroundState {
  debug('generate initial state');

  return {
    fetchStatus: null,
    errors: null,
    list: [
      // 'id-1',
      // 'id-2',
      // 'id-3',
      // 'id-4',
      // 'id-5',
      // 'id-6',
      // 'id-7',
      // 'id-8',
      // 'id-9',
    ],
    data: {
      // 'id-1': {
      //   id: 'id-1',
      //   userId: 'user-1',
      //   message: 'Hey, Jakob',
      // },
      // 'id-2': {
      //   id: 'id-2',
      //   userId: 'user-2',
      //   message: 'Hey!',
      // },
      // 'id-3': {
      //   id: 'id-3',
      //   userId: 'user-1',
      //   message: 'How are you?',
      // },
      // 'id-4': {
      //   id: 'id-4',
      //   userId: 'user-2',
      //   message: 'I am good, you?',
      // },
      // 'id-5': {
      //   id: 'id-5',
      //   userId: 'user-1',
      //   message: 'I am good too!',
      // },
      // 'id-6': {
      //   id: 'id-6',
      //   userId: 'user-2',
      //   message: 'That is good to hear!',
      // },
      // 'id-7': {
      //   id: 'id-7',
      //   userId: 'user-1',
      //   message: 'How has your day been so far?',
      // },
      // 'id-8': {
      //   id: 'id-8',
      //   userId: 'user-2',
      //   message:
      //     'It has been good. I went for a run this morning and then had a nice breakfast. How about you?',
      // },
      // 'id-9': {
      //   id: 'id-9',
      //   userId: 'user-1',
      //   message: 'I had a relaxing day. Just catching up on some reading.',
      // },
    },
    users: {
      'user-1': {
        id: 'user-1',
        avatar: LOGO_USER,
        name: 'Jane Doe',
      },
      'user-2': {
        id: 'user-2',
        avatar: LOGO_APP,
        name: siteConfig.title,
      },
    },
  };
}

export default createReducer<InitialPlaygroundState>({
  handlers: {
    [SEND_MESSAGE_REQUEST]: handleSendingMessageRequest,
    [SEND_MESSAGE_SUCCESS]: handleSendingMessageSuccess,
  },
  before: [],
  after: [],
});
