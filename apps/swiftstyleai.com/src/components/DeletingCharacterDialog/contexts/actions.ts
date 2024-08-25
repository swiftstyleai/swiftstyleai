import {
  CLOSE_DELETING_CHARACTER_DIALOG,
  OPEN_DELETING_CHARACTER_DIALOG,
  SEND_DELETING_CHARACTER_FAILURE,
  SEND_DELETING_CHARACTER_REQUEST,
  SEND_DELETING_CHARACTER_SUCCESS,
} from './constants';
import { Character } from './types';

/**
 * DELETING CHARACTER DRAWER
 */
export const openDeletingCharacterDialog = (character: Character) => ({
  type: OPEN_DELETING_CHARACTER_DIALOG,
  payload: character,
});

export const closeDeletingCharacterDialog = () => ({
  type: CLOSE_DELETING_CHARACTER_DIALOG,
});

export const sendDeletingCharacterRequest = () => ({
  type: SEND_DELETING_CHARACTER_REQUEST,
});

export const sendDeletingCharacterSuccess = () => ({
  type: SEND_DELETING_CHARACTER_SUCCESS,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendDeletingCharacterFailure = (error: any) => ({
  type: SEND_DELETING_CHARACTER_FAILURE,
  payload: error,
  error: true,
});
