import { HttpStatus } from '@/lib/constants';
import { type Action } from '@/lib/middlewares/types';

import { type Character, type DeletingCharacterDialogState } from '../types';

export const handleCharacterDeletionDrawerOpen = (
  state: DeletingCharacterDialogState,
  action: Action<Character> | undefined
): DeletingCharacterDialogState => ({
  ...state,
  open: true,
  character: action?.payload || null,
});

export const handleCharacterDeletionDrawerClose = (
  state: DeletingCharacterDialogState
): DeletingCharacterDialogState => ({
  ...state,
  open: false,
});

export const handleCharacterDeletionRequest = (
  state: DeletingCharacterDialogState
): DeletingCharacterDialogState => {
  return {
    ...state,
    fetchStatus: HttpStatus.LOADING,
    errors: null,
  };
};

export const handleCharacterDeletionSuccess = (
  state: DeletingCharacterDialogState
): DeletingCharacterDialogState => {
  return {
    ...state,
    fetchStatus: HttpStatus.LOADED,
    errors: null,
  };
};

export const handleCharacterDeletionFailure = (
  state: DeletingCharacterDialogState,
  action: Action<any> | undefined
): DeletingCharacterDialogState => {
  return {
    ...state,
    fetchStatus: HttpStatus.FAILED,
    errors: action?.payload,
  };
};
