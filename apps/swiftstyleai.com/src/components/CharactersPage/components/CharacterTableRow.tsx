import { useThrottleFn } from 'ahooks';
import { MoreHorizontal } from 'lucide-react';
import React, { useCallback } from 'react';

import { HttpStatus } from '@/lib/constants';
import { dateFormat } from '@/lib/format/date';
import { getFirstLetterWords } from '@/lib/format/string';
import { usePushHook } from '@/lib/react-transition-progress/next';

import { useDeletingCharacterDialogContext } from '@/components/DeletingCharacterDialog/contexts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { TableCell, TableRow } from '@/components/ui/table';
import { Typography } from '@/components/ui/typography';

import { useUser } from '@/contexts/auth/AuthProvider';
import { updateCharacterStatus } from '@/db/characters/browser';
import { type Tables } from '@/db/types';

import { useCharactersContext } from '../contexts';

export type Character = Tables<'characters'>;

export type CharacterTableRowProps = {
  data: Character;
};

const CharacterTableRow = ({ data }: CharacterTableRowProps) => {
  const { state: stateDeletingCharacterDialog, openDeletingCharacterDialog } =
    useDeletingCharacterDialogContext();

  const { updateCharacter } = useCharactersContext();
  const { fetchStatus: fetchStatusDeletingCharacterDialog } =
    stateDeletingCharacterDialog;

  const { user } = useUser();

  const { pushWithProgress } = usePushHook();

  const handleDeleteCharacter = useCallback(
    (character: Character) => {
      if (!character) return;
      openDeletingCharacterDialog && openDeletingCharacterDialog(character);
    },
    [openDeletingCharacterDialog]
  );

  const { run: toggleActiveState } = useThrottleFn(
    async (checked: boolean) => {
      const res = await updateCharacterStatus({
        characterId: data.id,
        isActive: checked,
      });
      updateCharacter && updateCharacter(res);
    },
    { wait: 2000 }
  );

  return (
    <TableRow className='cursor-pointer'>
      <TableCell
        className='pl-0'
        onClick={() => {
          pushWithProgress(`/characters/${data.id}`);
        }}
      >
        <div className='flex-1 min-w-0'>
          <Typography affects='small' className='leading-normal	truncate'>
            {data.name}
          </Typography>
          <Typography className='text-sm truncate hidden lg:block'>
            {data.description}
          </Typography>
        </div>
      </TableCell>
      <TableCell>
        <Switch
          defaultChecked={data.is_active}
          onCheckedChange={toggleActiveState}
        />
      </TableCell>

      <TableCell
        className='hidden md:table-cell'
        onClick={() => {
          pushWithProgress(`/characters/${data.id}`);
        }}
      >
        <div className='flex items-center gap-4'>
          <Avatar className='hidden h-9 w-9 sm:flex'>
            <AvatarImage src='/avatars/01.png' alt='Avatar' />
            <AvatarFallback>
              {getFirstLetterWords(user?.user_metadata.display_name)}
            </AvatarFallback>
          </Avatar>
          <p className='text-sm font-medium leading-none'>
            {user?.user_metadata.display_name}
          </p>
        </div>
      </TableCell>

      <TableCell
        className='hidden md:table-cell'
        onClick={() => {
          pushWithProgress(`/characters/${data.id}`);
        }}
      >
        {dateFormat(data.updated_at || data.created_at, 'yyyy-MM-dd hh:mm a')}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup='true' size='icon' variant='ghost'>
              <MoreHorizontal className='h-4 w-4' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                handleDeleteCharacter(data);
              }}
              disabled={
                fetchStatusDeletingCharacterDialog === HttpStatus.LOADING
              }
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default CharacterTableRow;
