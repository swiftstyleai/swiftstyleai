import { type Action } from '@/lib/middlewares/types';

import { generateInitialState } from './index';
import { handleUpdatingNavigating } from './navigation';
import { type InitialAppState } from '../types';

describe('contexts/app/reducer/navigating', () => {
  describe('handleUpdatingNavigating', () => {
    let initialState: InitialAppState;

    beforeEach(() => {
      initialState = generateInitialState();
    });

    test('should update isNavigating to true', () => {
      const action: Action<boolean> = {
        type: 'UPDATE_NAVIGATING',
        payload: true,
      };
      const newState = handleUpdatingNavigating(initialState, action);

      expect(newState.isNavigating).toBe(true);
      // Ensure other state properties remain unchanged if necessary
      // expect(newState.exampleProperty).toBe(initialState.exampleProperty);
    });

    test('should update isNavigating to false', () => {
      const action: Action<boolean> = {
        type: 'UPDATE_NAVIGATING',
        payload: false,
      };
      const newState = handleUpdatingNavigating(initialState, action);

      expect(newState.isNavigating).toBe(false);
      // Ensure other state properties remain unchanged if necessary
      // expect(newState.exampleProperty).toBe(initialState.exampleProperty);
    });

    test('should set isNavigating to false if action is undefined', () => {
      const newState = handleUpdatingNavigating(initialState, undefined);

      expect(newState.isNavigating).toBe(false);
      // Ensure other state properties remain unchanged if necessary
      // expect(newState.exampleProperty).toBe(initialState.exampleProperty);
    });

    test('should set isNavigating to false if action.payload is undefined', () => {
      const action: Action<boolean> = {
        type: 'UPDATE_NAVIGATING',
        payload: undefined,
      };
      const newState = handleUpdatingNavigating(initialState, action);

      expect(newState.isNavigating).toBe(false);
      // Ensure other state properties remain unchanged if necessary
      // expect(newState.exampleProperty).toBe(initialState.exampleProperty);
    });
  });
});
