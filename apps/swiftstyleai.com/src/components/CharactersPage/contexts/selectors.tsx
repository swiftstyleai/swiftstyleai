'use client';

import React from 'react';

import CharactersContext from './Context';

const useCharactersContext = () => {
  const contextValue = React.useContext(CharactersContext);
  if (!contextValue)
    throw new Error(
      ['`useCharactersContext` must be used within `CharactersProvider`.'].join(
        '\n'
      )
    );

  return contextValue;
};

export default useCharactersContext;
