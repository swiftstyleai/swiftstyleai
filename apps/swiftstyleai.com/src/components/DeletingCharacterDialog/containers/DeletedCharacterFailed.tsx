'use client';

import { useEffect } from 'react';

import { HttpStatus } from '@/lib/constants';

import { useDeletingCharacterDialogContext } from '../contexts';
import { type Character } from '../contexts/types';

export interface DeletedCharacterFailedProps {
  handler: (Character: Character) => void;
}

const DeletedCharacterFailed = ({ handler }: DeletedCharacterFailedProps) => {
  const { state: stateDeletingCharacterDialog } =
    useDeletingCharacterDialogContext();
  const { fetchStatus, character } = stateDeletingCharacterDialog;

  useEffect(() => {
    if (fetchStatus === HttpStatus.FAILED && character) {
      handler(character);
    }
  }, [fetchStatus, character, handler]);

  return null;
};

export default DeletedCharacterFailed;
