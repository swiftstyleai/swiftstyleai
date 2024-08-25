import React from 'react';

import { HttpStatus } from '@/lib/constants';

import CharacterTableRow from '@/components/CharactersPage/components/CharacterTableRow';
import CharacterTableRowSkeleton from '@/components/CharactersPage/components/CharacterTableRowSkeleton';
import CreatingCharacterDrawer from '@/components/CreatingCharacterDrawer';
import { CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useAppContext } from '@/contexts/app';

import { useDashboardContext } from '../contexts';
import { type Character } from '../contexts/types';

const Main = () => {
  const { state: stateDashboard, addCharacter } = useDashboardContext();

  const {
    state: stateApp,
    openCreatingCharacterDrawer,
    closeCreatingCharacterDrawer,
  } = useAppContext();

  const { creatingCharacterDrawer } = stateApp;
  const { fetchStatus, data, list } = stateDashboard;
  const characters = list.map((id: string) => data[id]);

  // const onClick = useCallback(() => {
  //   openCreatingCharacterDrawer && openCreatingCharacterDrawer();
  // }, [openCreatingCharacterDrawer]);

  return (
    <div
      style={
        {
          // background: 'green',
        }
      }
    >
      {/* <div className='flex items-center px-4 sm:px-6'>
        <div className='flex flex-col'>
          <CardTitle>Home</CardTitle>
          <CardDescription>Find and interact with your AIs.</CardDescription>
        </div>

        <div className='ml-auto flex items-center gap-2'>
          <Button size='sm' className='h-8 gap-1' onClick={onClick}>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
              Add Character
            </span>
          </Button>
        </div>
      </div> */}
      {/* <CardContent>
        <ul className='mt-6'>
          {fetchStatus !== HttpStatus.LOADING &&
            characters.map((ws: Character) => (
              <CharacterItem key={ws.id} data={ws} />
            ))}

          {fetchStatus === HttpStatus.LOADING && (
            <>
              <CharacterItemSkeleton />
              <CharacterItemSkeleton />
            </>
          )}
        </ul>
      </CardContent> */}
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
    </div>
  );
};

export default Main;
