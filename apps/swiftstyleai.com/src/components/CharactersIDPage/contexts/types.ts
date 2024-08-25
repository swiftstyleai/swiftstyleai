import { type HttpStatus } from '@/lib/constants';

import { type Tables } from '@/db/types';

export interface FetchStatus {
  fetchStatus: HttpStatus | null;
  errors: Error | null;
}

export type Instruction = Tables<'instructions'>;
export type Character = Tables<'characters'>;

export interface InitialCharactersIDPageState extends FetchStatus {
  // Mutable value
  list: string[];
  data: Record<string, Instruction>;
  character: Character | null;

  // Immutable value
  characterId: string | null;
}
