// https://github.com/redux-utilities/redux-actions/blob/master/src/handleAction.js
// https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#creating-the-root-reducer
import Debug from 'debug';

import { createReducer } from '@/lib/middlewares';

import { handleUpdatingCharacter } from './characters';
import {
  handleAddingInstruction,
  handleDeletingInstruction,
  handleFetchInstructionsRequest,
  handleFetchInstructionsSuccess,
} from './instructions';
import {
  ADD_INSTRUCTION,
  DELETE_INSTRUCTION,
  FETCH_INSTRUCTIONS_REQUEST,
  FETCH_INSTRUCTIONS_SUCCESS,
  UPDATE_CHARACTER,
} from '../constants';
import { type InitialCharactersIDPageState } from '../types';

const debug = Debug('components:CharactersIDPage:contexts:reducer');

export function generateInitialState(): InitialCharactersIDPageState {
  debug('generate initial state');

  return {
    fetchStatus: null,
    errors: null,
    list: [],
    data: {},
    characterId: null,
    character: null,
  };
}

export default createReducer<InitialCharactersIDPageState>({
  handlers: {
    [FETCH_INSTRUCTIONS_REQUEST]: handleFetchInstructionsRequest,
    [FETCH_INSTRUCTIONS_SUCCESS]: handleFetchInstructionsSuccess,
    [ADD_INSTRUCTION]: handleAddingInstruction,
    [DELETE_INSTRUCTION]: handleDeletingInstruction,
    [UPDATE_CHARACTER]: handleUpdatingCharacter,
  },
  before: [],
  after: [],
});
