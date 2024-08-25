import { type Action } from '@/lib/middlewares/types';

import { type Character, type InitialCharactersIDPageState } from '../types';

export const handleUpdatingCharacter = (
  state: InitialCharactersIDPageState,
  action: Action<Character> | undefined
): InitialCharactersIDPageState => {
  if (!action || !action.payload) {
    return state;
  }

  const character = action.payload;
  if (!character) {
    return state;
  }

  return {
    ...state,
    character,
    characterId: character.id,
  };
};
