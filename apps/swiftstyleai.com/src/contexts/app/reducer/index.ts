// https://github.com/redux-utilities/redux-actions/blob/master/src/handleAction.js
// https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#creating-the-root-reducer
import Debug from 'debug';

import { createReducer } from '@/lib/middlewares';

import {
  handleCharacterCreationDrawerClose,
  handleCharacterCreationDrawerOpen,
} from './character-drawer';
import {
  CLOSE_CREATING_CHARACTER_DRAWER,
  OPEN_CREATING_CHARACTER_DRAWER,
} from '../constants';
import { type InitialAppState } from '../types';

const debug = Debug('contexts:app:reducer');

export function generateInitialState(): InitialAppState {
  debug('generate initial state');

  return {
    creatingCharacterDrawer: {
      open: false,
    },
    isNavigating: false,
  };
}

export default createReducer<InitialAppState>({
  handlers: {
    [CLOSE_CREATING_CHARACTER_DRAWER]: handleCharacterCreationDrawerClose,
    [OPEN_CREATING_CHARACTER_DRAWER]: handleCharacterCreationDrawerOpen,
  },
  before: [],
  after: [],
});
