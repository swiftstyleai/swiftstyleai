'use client';

import * as React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import DeletedCharacterFailed from './DeletedCharacterFailed';
import DeletedCharacterSuccessfull from './DeletedCharacterSuccessfull';
import { useDeletingCharacterDialogContext } from '../contexts';
import { type Character } from '../contexts/types';

export interface DeletingCharacterDialogProps {
  onOpenDialog?: () => void;
  onCloseDialog?: () => void;
  onSuccess?: (character: Character) => void;
  onFailure?: (character: Character) => void;
}

function DeletingCharacterDialog({
  onOpenDialog,
  onCloseDialog,
  onSuccess,
  onFailure,
}: DeletingCharacterDialogProps) {
  const {
    state: stateDeletingCharacterDialog,
    sendDeletingCharacterRequest,
    closeDeletingCharacterDialog,
  } = useDeletingCharacterDialogContext();

  const { open, character } = stateDeletingCharacterDialog;

  const onOpenChange = React.useCallback(
    (state: boolean) => {
      if (state !== open && onOpenDialog && onCloseDialog) {
        state ? onOpenDialog() : onCloseDialog();
      }
      if (state !== open && state === false && closeDeletingCharacterDialog) {
        closeDeletingCharacterDialog();
      }
    },
    [open, onOpenDialog, onCloseDialog, closeDeletingCharacterDialog]
  );

  const onClickDeleteButton = React.useCallback(
    async (evt: React.SyntheticEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      onCloseDialog && onCloseDialog();
      closeDeletingCharacterDialog && closeDeletingCharacterDialog();
      if (character && character.id) {
        sendDeletingCharacterRequest && sendDeletingCharacterRequest();
      }
    },
    [
      character,
      onCloseDialog,
      sendDeletingCharacterRequest,
      closeDeletingCharacterDialog,
    ]
  );

  return (
    <>
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Character</AlertDialogTitle>
            <AlertDialogDescription>
              <p>
                <strong>Are you sure you want to delete this character?</strong>{' '}
                This action is irreversible. All data and settings associated
                with this character will be permanently deleted.
              </p>
              <br />
              <p>
                <strong>Character Name:</strong> {character?.name}
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant='secondary'>Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={onClickDeleteButton}>Delete</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {onSuccess && <DeletedCharacterSuccessfull handler={onSuccess} />}
      {onFailure && <DeletedCharacterFailed handler={onFailure} />}
    </>
  );
}

export default DeletingCharacterDialog;
