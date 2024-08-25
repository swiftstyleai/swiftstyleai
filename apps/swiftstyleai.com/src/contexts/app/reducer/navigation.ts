import { type Action } from '@/lib/middlewares/types';

import { type InitialAppState } from '../types';

export const handleUpdatingNavigating = (
  state: InitialAppState,
  action: Action<boolean> | undefined
): InitialAppState => ({
  ...state,
  isNavigating: !!action?.payload,
});
