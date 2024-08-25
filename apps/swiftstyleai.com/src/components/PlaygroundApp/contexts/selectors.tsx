'use client';

import React from 'react';

import PlaygroundContext from './Context';

const usePlaygroundContext = () => {
  const contextValue = React.useContext(PlaygroundContext);
  if (!contextValue)
    throw new Error(
      ['`usePlaygroundContext` must be used within `PlaygroundProvider`.'].join(
        '\n'
      )
    );

  return contextValue;
};

export default usePlaygroundContext;
