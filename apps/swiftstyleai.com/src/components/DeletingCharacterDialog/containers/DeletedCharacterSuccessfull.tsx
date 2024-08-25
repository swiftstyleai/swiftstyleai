'use client';

import { useEffect } from 'react';

import { HttpStatus } from '@/lib/constants';

import { useDeletingCharacterDialogContext } from '../contexts';
import { type Character } from '../contexts/types';

export interface DeletedCharacterSuccessfullProps {
  handler: (Character: Character) => void;
}

const DeletedCharacterSuccessfull = ({
  handler,
}: DeletedCharacterSuccessfullProps) => {
  const { state: stateDeletingCharacterDialog } =
    useDeletingCharacterDialogContext();
  const { fetchStatus, character } = stateDeletingCharacterDialog;

  useEffect(() => {
    if (fetchStatus === HttpStatus.LOADED && character) {
      handler(character);
    }
  }, [fetchStatus, character, handler]);

  return null;
};

export default DeletedCharacterSuccessfull;
