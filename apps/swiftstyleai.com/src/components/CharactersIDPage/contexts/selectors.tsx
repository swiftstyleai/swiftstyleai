'use client';

import React from 'react';

import CharactersIDContext from './Context';

const useCharactersIDContext = () => {
  const contextValue = React.useContext(CharactersIDContext);
  if (!contextValue)
    throw new Error(
      [
        '`useCharactersIDContext` must be used within `CharactersIDProvider`.\n',
      ].join('\n')
    );

  return contextValue;
};

export default useCharactersIDContext;
