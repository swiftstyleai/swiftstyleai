'use client';

// https://github.com/sushiswap/sushiswap/blob/5968f1b44e963aa9e0ca5747cefa5cd394004562/apps/evm/src/ui/pool/ConcentratedLiquidityProvider.tsx#L94
import * as Portal from '@radix-ui/react-portal';
import Debug from 'debug';
import React, { useCallback, useEffect, useMemo, useReducer } from 'react';

import { HttpStatus } from '@/lib/constants';

import LinearProgress from '@/components/ui/LinearProgress';

import { deleteCharacter as deleteCharacterDb } from '@/db/characters/browser';

import {
  closeDeletingCharacterDialog as closeDeletingCharacterDialogAction,
  openDeletingCharacterDialog as openDeletingCharacterDialogAction,
  sendDeletingCharacterFailure as sendDeletingCharacterFailureAction,
  sendDeletingCharacterRequest as sendDeletingCharacterRequestAction,
  sendDeletingCharacterSuccess as sendDeletingCharacterSuccessAction,
} from './actions';
import { DeletingCharacterDialogContext } from './Context';
import reducerDefault, { generateInitialState } from './reducer';
import { type Character, type DeletingCharacterDialogState } from './types';

const debug = Debug('components:DeletingCharacterDialog:Provider');

export interface DeletingCharacterDialogProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reducer?: React.Reducer<DeletingCharacterDialogState, any>;
  children?: React.ReactNode;
}

export const DeletingCharacterDialogProvider = React.memo(
  function DeletingCharacterDialogProvider({
    reducer = reducerDefault,
    children,
  }: DeletingCharacterDialogProviderProps) {
    debug('render');

    const initdata = generateInitialState();
    const [state, dispatch] = useReducer(reducer, initdata);

    const contextValue = useMemo(() => {
      const openDeletingCharacterDialog = (character: Character) => {
        dispatch(openDeletingCharacterDialogAction(character));
      };
      const closeDeletingCharacterDialog = () => {
        dispatch(closeDeletingCharacterDialogAction());
      };
      const sendDeletingCharacterRequest = () => {
        dispatch(sendDeletingCharacterRequestAction());
      };
      const sendDeletingCharacterSuccess = () => {
        dispatch(sendDeletingCharacterSuccessAction());
      };
      const sendDeletingCharacterFailure = (error: any) => {
        dispatch(sendDeletingCharacterFailureAction(error));
      };

      return {
        state,
        dispatch,
        openDeletingCharacterDialog,
        closeDeletingCharacterDialog,
        sendDeletingCharacterRequest,
        sendDeletingCharacterSuccess,
        sendDeletingCharacterFailure,
      };
    }, [state, dispatch]);

    const sendRequest = useCallback(async () => {
      if (!contextValue.state.character || !contextValue.state.character.id) {
        const errorMsg = 'Character ID not found';
        contextValue.sendDeletingCharacterFailure &&
          contextValue.sendDeletingCharacterFailure(new Error(errorMsg));
        return;
      }

      try {
        const res = await deleteCharacterDb(contextValue.state.character.id);
        if (!res) {
          throw new Error('Error deleting character from database');
        }
        contextValue.sendDeletingCharacterSuccess &&
          contextValue.sendDeletingCharacterSuccess();
      } catch (error) {
        console.error('Error deleting character:', error);
        contextValue.sendDeletingCharacterFailure &&
          contextValue.sendDeletingCharacterFailure(error);
      }
    }, [contextValue]);

    useEffect(() => {
      if (contextValue.state.fetchStatus === HttpStatus.LOADING) {
        sendRequest();
      }
    }, [
      contextValue.state.fetchStatus,
      contextValue.state.character,
      sendRequest,
    ]);

    return (
      <DeletingCharacterDialogContext.Provider value={contextValue}>
        {contextValue.state.fetchStatus === HttpStatus.LOADING ? (
          <Portal.Root>
            <LinearProgress className='fixed top-0 z-10' />
          </Portal.Root>
        ) : null}
        {children}
      </DeletingCharacterDialogContext.Provider>
    );
  }
);
