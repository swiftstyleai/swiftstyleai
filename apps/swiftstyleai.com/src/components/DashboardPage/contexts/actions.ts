import {
  ADD_CHARACTER,
  FETCH_CHARACTERS_FAILURE,
  FETCH_CHARACTERS_REQUEST,
  FETCH_CHARACTERS_SUCCESS,
} from './constants';
import { type Character } from './types';

export const fetchCharactersRequest = () => ({
  type: FETCH_CHARACTERS_REQUEST,
});

export const fetchCharactersSuccess = (data: Character[]) => ({
  type: FETCH_CHARACTERS_SUCCESS,
  payload: data,
});

// MulticallErrorType
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchCharactersFailure = (error: any) => ({
  type: FETCH_CHARACTERS_FAILURE,
  payload: error,
  error: true,
});

export const addCharacter = (data: Character) => ({
  type: ADD_CHARACTER,
  payload: data,
});