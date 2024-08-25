'use client';

// https://github.com/sushiswap/sushiswap/blob/5968f1b44e963aa9e0ca5747cefa5cd394004562/apps/evm/src/ui/pool/ConcentratedLiquidityProvider.tsx#L94
import Debug from 'debug';
import React, { useEffect, useMemo, useReducer } from 'react';

import {
  addCharacter as addCharacterAction,
  fetchCharactersFailure as fetchCharactersFailureAction,
  fetchCharactersRequest as fetchCharactersRequestAction,
  fetchCharactersSuccess as fetchCharactersSuccessAction,
} from './actions';
import CharactersContext from './Context';
import reducerDefault, { generateInitialState } from './reducer';
import { type Character, type InitialDashboardState } from './types';

const debug = Debug('components:DashboardPage:contexts:DashboardProvider');

export interface DashboardProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reducer?: React.Reducer<InitialDashboardState, any>;
  children?: React.ReactNode;
}

const DashboardProvider: React.FC<DashboardProviderProps> = ({
  reducer = reducerDefault,
  children,
}: DashboardProviderProps) => {
  debug('render');

  const initdata = generateInitialState();
  const [state, dispatch] = useReducer(reducer, initdata);

  const contextValue = useMemo(() => {
    const fetchCharactersRequest = () => {
      dispatch(fetchCharactersRequestAction());
    };
    const fetchCharactersSuccess = (data: Character[]) => {
      dispatch(fetchCharactersSuccessAction(data));
    };
    const fetchCharactersFailure = (err: any) => {
      dispatch(fetchCharactersFailureAction(err));
    };
    const addCharacter = (data: Character) => {
      dispatch(addCharacterAction(data));
    };

    return {
      state,
      dispatch,
      fetchCharactersRequest,
      fetchCharactersSuccess,
      fetchCharactersFailure,
      addCharacter,
    };
  }, [state, dispatch]);

  useEffect(() => {
    dispatch(fetchCharactersRequestAction());
  }, []);

  return (
    <CharactersContext.Provider value={contextValue}>
      {children}
    </CharactersContext.Provider>
  );
};

export default React.memo(DashboardProvider);
