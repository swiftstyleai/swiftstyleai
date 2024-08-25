'use client';

// https://stackoverflow.com/questions/57298149/react-ts-usecontext-usereducer-hook
import { type Dispatch, createContext } from 'react';

import { type InitialPlaygroundState, type Message } from './types';

export interface PlaygroundContext {
  state: InitialPlaygroundState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  sendMessageRequest?: (data: Message) => void;
  sendMessageSuccess?: (data: Message) => void;
  sendMessageFailure?: (err: any) => void;
}

const PlaygroundContext = createContext<PlaygroundContext>({
  state: {} as InitialPlaygroundState,
  dispatch: () => null, // Mock dispatch function
});

export default PlaygroundContext;
