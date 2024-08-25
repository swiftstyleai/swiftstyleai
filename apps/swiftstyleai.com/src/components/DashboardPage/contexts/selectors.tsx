'use client';

import React from 'react';

import DashboardContext from './Context';

const useDashboardContext = () => {
  const contextValue = React.useContext(DashboardContext);
  if (!contextValue)
    throw new Error(
      ['`useDashboardContext` must be used within `DashboardProvider`.'].join(
        '\n'
      )
    );

  return contextValue;
};

export default useDashboardContext;
