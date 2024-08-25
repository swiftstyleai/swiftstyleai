// https://github.com/redux-utilities/redux-actions/blob/master/src/handleAction.js
// https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#creating-the-root-reducer
import Debug from 'debug';

import { createReducer } from '@/lib/middlewares';

import {
  handleFetchCharactersRequest,
  handleFetchCharactersSuccess,
} from './characters';
import {
  FETCH_CHARACTERS_REQUEST,
  FETCH_CHARACTERS_SUCCESS,
} from '../constants';
import { type InitialDashboardState } from '../types';

const debug = Debug('components:DashboardPage:contexts:reducer');

export function generateInitialState(): InitialDashboardState {
  debug('generate initial state');

  return {
    fetchStatus: null,
    errors: null,
    list: [],
    data: {},
  };
}

export default createReducer<InitialDashboardState>({
  handlers: {
    [FETCH_CHARACTERS_REQUEST]: handleFetchCharactersRequest,
    [FETCH_CHARACTERS_SUCCESS]: handleFetchCharactersSuccess,
  },
  before: [],
  after: [],
});
