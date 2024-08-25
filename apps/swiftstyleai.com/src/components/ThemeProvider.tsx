// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// https://stackoverflow.com/questions/59729654/how-to-ignore-typescript-errors-with-ts-ignore
// https://stackoverflow.com/questions/31086843/possible-to-disable-type-checking
// https://github.com/pacocoursey/next-themes/issues/279
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import * as React from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
