'use client';

// https://github.com/sushiswap/sushiswap/blob/5968f1b44e963aa9e0ca5747cefa5cd394004562/apps/evm/src/ui/pool/ConcentratedLiquidityProvider.tsx#L94
import Debug from 'debug';
import React, { useMemo, useReducer } from 'react';

import {
  sendMessageFailure as sendMessageFailureAction,
  sendMessageRequest as sendMessageRequestAction,
  sendMessageSuccess as sendMessageSuccessAction,
} from './actions';
import PlaygroundContext from './Context';
import reducerDefault, { generateInitialState } from './reducer';
import { type InitialPlaygroundState, type Message } from './types';

const debug = Debug('components:PlaygroundApp:contexts:PlaygroundProvider');

export interface PlaygroundProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reducer?: React.Reducer<InitialPlaygroundState, any>;
  children?: React.ReactNode;
}

const PlaygroundProvider: React.FC<PlaygroundProviderProps> = ({
  reducer = reducerDefault,
  children,
}: PlaygroundProviderProps) => {
  debug('render');

  const initdata = generateInitialState();
  const [state, dispatch] = useReducer(reducer, initdata);

  const contextValue = useMemo(() => {
    const sendMessageRequest = (data: Message) => {
      dispatch(sendMessageRequestAction(data));
    };
    const sendMessageSuccess = (data: Message) => {
      dispatch(sendMessageSuccessAction(data));
    };
    const sendMessageFailure = (err: any) => {
      dispatch(sendMessageFailureAction(err));
    };

    return {
      state,
      dispatch,
      sendMessageRequest,
      sendMessageSuccess,
      sendMessageFailure,
    };
  }, [state, dispatch]);

  return (
    <PlaygroundContext.Provider value={contextValue}>
      {children}
    </PlaygroundContext.Provider>
  );
};

export default React.memo(PlaygroundProvider);
