'use client';

import { useCallback, useEffect } from 'react';

import { HttpStatus } from '@/lib/constants';

import { getCharacterById } from '@/db/characters/browser';
import { getInstructionsByCharacterId } from '@/db/instructions/browser';

import { useCharactersIDContext } from '../contexts';

// export interface FetchInstructionsProps {}

const FetchInstructions = () => {
  const {
    state: stateInstructions,
    fetchInstructionsSuccess,
    fetchInstructionsFailure,
  } = useCharactersIDContext();

  const fetchData = useCallback(async () => {
    try {
      if (stateInstructions.characterId) {
        const instructions = await getInstructionsByCharacterId(
          stateInstructions.characterId
        );
        const character = await getCharacterById(stateInstructions.characterId);

        fetchInstructionsSuccess &&
          fetchInstructionsSuccess({
            instructions,
            character,
          });
      }
    } catch (error) {
      // Handle error: Update state or log error message
      // eslint-disable-next-line no-console
      console.error('Error fetching token data:', error);
      fetchInstructionsFailure &&
        fetchInstructionsFailure({
          error,
        });
    }
  }, [
    fetchInstructionsSuccess,
    fetchInstructionsFailure,
    stateInstructions.characterId,
  ]);

  useEffect(() => {
    if (stateInstructions.fetchStatus === HttpStatus.LOADING) {
      fetchData();
    }
  }, [stateInstructions.fetchStatus, fetchData]);

  return null;
};

export default FetchInstructions;
