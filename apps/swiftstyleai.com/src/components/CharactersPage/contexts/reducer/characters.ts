import { HttpStatus } from '@/lib/constants';
import { Action } from '@/lib/middlewares/types';

import { type Character, type InitialCharactersPageState } from '../types';

export const handleFetchCharactersRequest = (
  state: InitialCharactersPageState
): InitialCharactersPageState => {
  return {
    ...state,
    fetchStatus: HttpStatus.LOADING,
    errors: null,
  };
};

export const handleFetchCharactersSuccess = (
  state: InitialCharactersPageState,
  action: Action<Character[]> | undefined
): InitialCharactersPageState => {
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

export const handleDeletingCharacter = (
  state: InitialCharactersPageState,
  action: Action<string> | undefined
): InitialCharactersPageState => {
  if (!action || !action.payload) {
    return state;
  }

  const characterId = action.payload;
  const { list, data } = state;

  // Filter the list to remove the instruction ID
  const newList = list.filter((id: string) => id !== characterId);

  // Create a new data object without the deleted instruction
  const { [characterId]: _, ...newData } = data;

  return {
    ...state,
    fetchStatus: HttpStatus.LOADED,
    errors: null,
    list: newList,
    data: newData,
  };
};

export const handleUpdatingCharacter = (
  state: InitialCharactersPageState,
  action: Action<Character> | undefined
): InitialCharactersPageState => {
  if (!action?.payload) {
    return state;
  }

  const { data } = state;
  const character = action.payload;

  return {
    ...state,
    data: {
      ...data,
      [character.id]: character,
    },
  };
};
