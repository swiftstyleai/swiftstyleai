import React, { useCallback } from 'react';

import { HttpStatus } from '@/lib/constants';

// import CharacterItem from '@/components/CharacterItem';
// import CharacterItemSkeleton from '@/components/CharacterItemSkeleton';
import CreatingCharacterDrawer from '@/components/CreatingCharacterDrawer';
import DeletedCharacterSuccessfull from '@/components/DeletingCharacterDialog/containers/DeletedCharacterSuccessfull';
import DeletingCharacterDialog from '@/components/DeletingCharacterDialog/containers/DeletingCharacterDialog';
import { CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useAppContext } from '@/contexts/app';

import CharacterTableRow from '../components/CharacterTableRow';
import CharacterTableRowSkeleton from '../components/CharacterTableRowSkeleton';
import { useCharactersContext } from '../contexts';
import { type Character } from '../contexts/types';

const Main = () => {
  const {
    state: stateCharacters,
    addCharacter,
    deleteCharacter,
  } = useCharactersContext();

  const {
    state: stateApp,
    openCreatingCharacterDrawer,
    closeCreatingCharacterDrawer,
  } = useAppContext();

  const { creatingCharacterDrawer } = stateApp;
  const { fetchStatus, data, list } = stateCharacters;
  const characters = list.map((id: string) => data[id]);

  const onClick = useCallback(() => {
    openCreatingCharacterDrawer && openCreatingCharacterDrawer();
  }, [openCreatingCharacterDrawer]);

  return (
    <>
      {/* <div className='flex items-center px-4 sm:px-6'>
        <div className='flex flex-col'>
          <CardTitle>Characters</CardTitle>
          <CardDescription>Find and interact with your AIs.</CardDescription>
        </div>

        <div className='ml-auto flex items-center gap-2'>
          <Button size='sm' className='h-8 gap-1' onClick={onClick}>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
              Add Characters
            </span>
          </Button>
        </div>
      </div> */}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='pl-0'>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='hidden md:table-cell'>Author</TableHead>
              <TableHead className='hidden md:table-cell'>Updated at</TableHead>
              <TableHead>
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetchStatus !== HttpStatus.LOADING &&
              characters.map((ws: Character) => (
                <CharacterTableRow key={ws.id} data={ws} />
              ))}
            {fetchStatus === HttpStatus.LOADING && (
              <>
                <CharacterTableRowSkeleton />
                <CharacterTableRowSkeleton />
              </>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CreatingCharacterDrawer
        open={creatingCharacterDrawer.open}
        onCreatedWorkspace={addCharacter}
        onOpenDrawer={openCreatingCharacterDrawer}
        onCloseDrawer={closeCreatingCharacterDrawer}
      />
      <DeletingCharacterDialog />
      <DeletedCharacterSuccessfull
        handler={(character: Character) => {
          deleteCharacter && deleteCharacter(character.id);
        }}
      />
    </>
  );
};

export default Main;
