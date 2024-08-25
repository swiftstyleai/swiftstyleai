import { HttpStatus } from '@/lib/constants';
import { Action } from '@/lib/middlewares/types';

import { type Character, type InitialDashboardState } from '../types';

export const handleFetchCharactersRequest = (
  state: InitialDashboardState
): InitialDashboardState => {
  return {
    ...state,
    fetchStatus: HttpStatus.LOADING,
    errors: null,
  };
};

export const handleFetchCharactersSuccess = (
  state: InitialDashboardState,
  action: Action<Character[]> | undefined
): InitialDashboardState => {
  if (!action) {
    return state;
  }

  const characters = action.payload;
  if (!characters) {
    return state;
  }
  const list: string[] = [];
  const data: Record<string, Character> = {};

  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];
    if (character && character.id) {
      list.push(character.id);
      data[character.id] = character;
    }
  }

  return {
    ...state,
    fetchStatus: HttpStatus.LOADED,
    errors: null,
    list,
    data,
  };
};
