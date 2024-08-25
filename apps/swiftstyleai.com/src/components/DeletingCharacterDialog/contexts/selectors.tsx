'use client';

import React from 'react';

import { DeletingCharacterDialogContext } from './Context';

export const useDeletingCharacterDialogContext = () => {
  const contextValue = React.useContext(DeletingCharacterDialogContext);
  if (!contextValue)
    throw new Error(
      [
        '`useDeletingCharacterDialogContext` must be used within `DeletingCharacterDialogProvider`.',
      ].join('\n')
    );

  return contextValue;
};
