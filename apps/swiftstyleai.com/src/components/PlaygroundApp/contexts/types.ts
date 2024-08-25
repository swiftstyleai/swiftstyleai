import { HttpStatus } from '@/lib/constants';

export interface FetchStatus {
  fetchStatus: HttpStatus | null;
  errors: Error | null;
}

export type Message = {
  id: string;
  userId: string;
  message: string;
};

export type User = {
  id: string;
  avatar: string | JSX.Element;
  name: string;
};

export interface InitialPlaygroundState extends FetchStatus {
  // UI

  // Mutable value

  // Immutable value
  list: string[];
  data: Record<string, Message>;
  users: Record<string, User>;
}
