import { type Tables } from '@/db/types';

export type Character = Tables<'characters'>;

import { HttpStatus } from '@/lib/constants';

export interface DeletingCharacterDialogState {
  open: boolean;
  fetchStatus: HttpStatus | null;
  errors: Error | null;
  character: Character | null;
}
