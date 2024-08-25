'use client';

import { useCallback, useEffect } from 'react';

import { HttpStatus } from '@/lib/constants';

import { getCharacters } from '@/db/characters/browser';

import { useCharactersContext } from '../contexts';

// export interface FetchCharactersProps {}

const FetchCharacters = () => {
  const {
    state: stateCharacters,
    fetchCharactersSuccess,
    fetchCharactersFailure,
  } = useCharactersContext();

  const fetchData = useCallback(async () => {
    try {
      const characters = await getCharacters();
      if (characters) {
        fetchCharactersSuccess && fetchCharactersSuccess(characters);
      }
    } catch (error) {
      // Handle error: Update state or log error message
      // eslint-disable-next-line no-console
      console.error('Error fetching token data:', error);
      fetchCharactersFailure &&
        fetchCharactersFailure({
          error,
        });
    }
  }, [fetchCharactersSuccess, fetchCharactersFailure]);

  useEffect(() => {
    if (stateCharacters.fetchStatus === HttpStatus.LOADING) {
      fetchData();
    }
  }, [stateCharacters.fetchStatus, fetchData]);

  return null;
};

export default FetchCharacters;
