import { HttpStatus } from '@/lib/constants';

import { type Tables } from '@/db/types';

export interface FetchStatus {
  fetchStatus: HttpStatus | null;
  errors: Error | null;
}

export type Character = Tables<'characters'>;

export interface InitialDashboardState extends FetchStatus {
  // UI

  // Mutable value

  // Immutable value
  list: string[];
  data: Record<string, Character>;
}
