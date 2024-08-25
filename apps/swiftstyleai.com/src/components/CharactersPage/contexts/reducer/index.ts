// https://github.com/redux-utilities/redux-actions/blob/master/src/handleAction.js
// https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#creating-the-root-reducer
import Debug from 'debug';

import { createReducer } from '@/lib/middlewares';

import {
  handleDeletingCharacter,
  handleFetchCharactersRequest,
  handleFetchCharactersSuccess,
  handleUpdatingCharacter,
} from './characters';
import {
  DELETE_CHARACTER,
  FETCH_CHARACTERS_REQUEST,
  FETCH_CHARACTERS_SUCCESS,
  UPDATE_CHARACTER,
} from '../constants';
import { type InitialCharactersPageState } from '../types';

const debug = Debug('components:CharactersPage:contexts:reducer');

export function generateInitialState(): InitialCharactersPageState {
  debug('generate initial state');

  return {
    fetchStatus: null,
    errors: null,
    list: [],
    data: {},
  };
}

export default createReducer<InitialCharactersPageState>({
  handlers: {
    [FETCH_CHARACTERS_REQUEST]: handleFetchCharactersRequest,
    [FETCH_CHARACTERS_SUCCESS]: handleFetchCharactersSuccess,
    [DELETE_CHARACTER]: handleDeletingCharacter,
    [UPDATE_CHARACTER]: handleUpdatingCharacter,
  },
  before: [],
  after: [],
});
