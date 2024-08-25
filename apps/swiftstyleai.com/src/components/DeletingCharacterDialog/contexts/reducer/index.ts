// https://github.com/redux-utilities/redux-actions/blob/master/src/handleAction.js
// https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#creating-the-root-reducer
import Debug from 'debug';

import { createReducer } from '@/lib/middlewares';

import {
  handleCharacterDeletionDrawerClose,
  handleCharacterDeletionDrawerOpen,
  handleCharacterDeletionFailure,
  handleCharacterDeletionRequest,
  handleCharacterDeletionSuccess,
} from './character-drawer';
import {
  CLOSE_DELETING_CHARACTER_DIALOG,
  OPEN_DELETING_CHARACTER_DIALOG,
  SEND_DELETING_CHARACTER_FAILURE,
  SEND_DELETING_CHARACTER_REQUEST,
  SEND_DELETING_CHARACTER_SUCCESS,
} from '../constants';
import { type DeletingCharacterDialogState } from '../types';

const debug = Debug('components:DeletingCharacterDialog:reducer');

export function generateInitialState(): DeletingCharacterDialogState {
  debug('generate initial state');

  return {
    fetchStatus: null,
    errors: null,
    open: false,
    character: null,
  };
}

export default createReducer<DeletingCharacterDialogState>({
  handlers: {
    [OPEN_DELETING_CHARACTER_DIALOG]: handleCharacterDeletionDrawerOpen,
    [CLOSE_DELETING_CHARACTER_DIALOG]: handleCharacterDeletionDrawerClose,
    [SEND_DELETING_CHARACTER_REQUEST]: handleCharacterDeletionRequest,
    [SEND_DELETING_CHARACTER_SUCCESS]: handleCharacterDeletionSuccess,
    [SEND_DELETING_CHARACTER_FAILURE]: handleCharacterDeletionFailure,
  },
  before: [],
  after: [],
});
