'use client';

// https://github.com/sushiswap/sushiswap/blob/5968f1b44e963aa9e0ca5747cefa5cd394004562/apps/evm/src/ui/pool/ConcentratedLiquidityProvider.tsx#L94
import Debug from 'debug';
import React, { useMemo, useReducer } from 'react';

import {
  closeCreatingCharacterDrawer as closeCreatingCharacterDrawerAction,
  openCreatingCharacterDrawer as openCreatingCharacterDrawerAction,
  updateNavigation as updateNavigationAction,
} from './actions';
import AppContext from './Context';
import reducerDefault, { generateInitialState } from './reducer';
import { type InitialAppState } from './types';

const debug = Debug('contexts:app:AppProvider');

export interface AppProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reducer?: React.Reducer<InitialAppState, any>;
  children?: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({
  reducer = reducerDefault,
  children,
}: AppProviderProps) => {
  debug('render');

  const initdata = generateInitialState();
  const [state, dispatch] = useReducer(reducer, initdata);

  const contextValue = useMemo(() => {
    const openCreatingCharacterDrawer = () => {
      dispatch(openCreatingCharacterDrawerAction());
    };
    const closeCreatingCharacterDrawer = () => {
      dispatch(closeCreatingCharacterDrawerAction());
    };
    const updateNavigation = (state: boolean) => {
      dispatch(updateNavigationAction(state));
    };

    return {
      state,
      dispatch,
      openCreatingCharacterDrawer,
      closeCreatingCharacterDrawer,
      updateNavigation,
    };
  }, [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default React.memo(AppProvider);
