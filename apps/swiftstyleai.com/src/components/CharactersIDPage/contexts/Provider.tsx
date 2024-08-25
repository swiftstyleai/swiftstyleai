'use client';

// https://github.com/sushiswap/sushiswap/blob/5968f1b44e963aa9e0ca5747cefa5cd394004562/apps/evm/src/ui/pool/ConcentratedLiquidityProvider.tsx#L94
import Debug from 'debug';
import React, { useEffect, useMemo, useReducer } from 'react';

import {
  type FetchInstructionsSuccessParams,
  addInstruction as addInstructionAction,
  deleteInstruction as deleteInstructionAction,
  fetchInstructionsFailure as fetchInstructionsFailureAction,
  fetchInstructionsRequest as fetchInstructionsRequestAction,
  fetchInstructionsSuccess as fetchInstructionsSuccessAction,
  updateCharacter as updateCharacterAction,
} from './actions';
import CharactersIDContext from './Context';
import reducerDefault, { generateInitialState } from './reducer';
import {
  type Character,
  type InitialCharactersIDPageState,
  type Instruction,
} from './types';

const debug = Debug(
  'components:CharactersIDPage:contexts:CharactersIDProvider'
);

export interface CharactersIDProviderProps {
  characterId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reducer?: React.Reducer<InitialCharactersIDPageState, any>;
  children?: React.ReactNode;
}

const CharactersIDProvider: React.FC<CharactersIDProviderProps> = ({
  characterId,
  reducer = reducerDefault,
  children,
}: CharactersIDProviderProps) => {
  debug('render');

  const initdata = generateInitialState();

  const [state, dispatch] = useReducer(reducer, initdata);

  const contextValue = useMemo(() => {
    const fetchInstructionsRequest = (characterId: string) => {
      dispatch(fetchInstructionsRequestAction(characterId));
    };

    const fetchInstructionsSuccess = (data: FetchInstructionsSuccessParams) => {
      dispatch(fetchInstructionsSuccessAction(data));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fetchInstructionsFailure = (error: any) => {
      dispatch(fetchInstructionsFailureAction(error));
    };

    const addInstruction = (data: Instruction) => {
      dispatch(addInstructionAction(data));
    };

    const deleteInstruction = (id: string) => {
      dispatch(deleteInstructionAction(id));
    };

    const updateCharacter = (character: Character) => {
      dispatch(updateCharacterAction(character));
    };

    return {
      state,
      dispatch,
      fetchInstructionsRequest,
      fetchInstructionsSuccess,
      fetchInstructionsFailure,
      addInstruction,
      deleteInstruction,
      updateCharacter,
    };
  }, [state, dispatch]);

  useEffect(() => {
    if (
      characterId &&
      state.fetchStatus === null &&
      fetchInstructionsRequestAction
    ) {
      dispatch(fetchInstructionsRequestAction(characterId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  return (
    <CharactersIDContext.Provider value={contextValue}>
      {children}
    </CharactersIDContext.Provider>
  );
};

export default React.memo(CharactersIDProvider);
