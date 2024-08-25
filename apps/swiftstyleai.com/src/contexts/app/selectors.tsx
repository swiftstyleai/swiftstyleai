'use client';

import React from 'react';

import AppContext from './Context';

const useAppContext = () => {
  const contextValue = React.useContext(AppContext);
  if (!contextValue)
    throw new Error(
      ['`useAppContext` must be used within `AppProvider`.'].join('\n')
    );

  return contextValue;
};

export default useAppContext;
