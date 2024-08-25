'use client';

// https://github.com/sushiswap/sushiswap/blob/5968f1b44e963aa9e0ca5747cefa5cd394004562/apps/evm/src/ui/pool/ConcentratedLiquidityProvider.tsx#L94
import Debug from 'debug';
import React, { useEffect, useMemo, useReducer } from 'react';

import {
  addCharacter as addCharacterAction,
  deleteCharacter as deleteCharacterAction,
  fetchCharactersFailure as fetchCharactersFailureAction,
  fetchCharactersRequest as fetchCharactersRequestAction,
  fetchCharactersSuccess as fetchCharactersSuccessAction,
  updateCharacter as updateCharacterAction,
} from './actions';
import CharactersContext from './Context';
import reducerDefault, { generateInitialState } from './reducer';
import { type Character, type InitialCharactersPageState } from './types';

const debug = Debug('components:CharactersPage:contexts:CharactersProvider');

export interface CharactersProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reducer?: React.Reducer<InitialCharactersPageState, any>;
  children?: React.ReactNode;
}

const CharactersProvider: React.FC<CharactersProviderProps> = ({
  reducer = reducerDefault,
  children,
}: CharactersProviderProps) => {
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
    const updateCharacter = (data: Character) => {
      dispatch(updateCharacterAction(data));
    };
    const deleteCharacter = (characterId: string) => {
      dispatch(deleteCharacterAction(characterId));
    };

    return {
      state,
      dispatch,
      fetchCharactersRequest,
      fetchCharactersSuccess,
      fetchCharactersFailure,
      addCharacter,
      deleteCharacter,
      updateCharacter,
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

export default React.memo(CharactersProvider);
