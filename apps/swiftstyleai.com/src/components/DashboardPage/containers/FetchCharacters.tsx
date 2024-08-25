'use client';

import { useCallback, useEffect } from 'react';

import { HttpStatus } from '@/lib/constants';

import { getCharacters } from '@/db/characters/browser';

import { useDashboardContext } from '../contexts';

// export interface FetchCharactersProps {}
// const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const FetchCharacters = () => {
  const {
    state: stateCharacters,
    fetchCharactersSuccess,
    fetchCharactersFailure,
  } = useDashboardContext();

  const fetchData = useCallback(async () => {
    try {
      const characters = await getCharacters();

      // await delay(3500);

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
