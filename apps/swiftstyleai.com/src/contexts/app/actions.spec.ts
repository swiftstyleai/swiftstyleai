import {
  closeCreatingCharacterDrawer,
  openCreatingCharacterDrawer,
  updateNavigation,
} from './actions';
import {
  CLOSE_CREATING_CHARACTER_DRAWER,
  OPEN_CREATING_CHARACTER_DRAWER,
  UPDATE_NAVIGATION,
} from './constants';

describe('contexts/app/actions', () => {
  describe('openCreatingCharacterDrawer', () => {
    it('should create an OPEN_CREATING_CHARACTER_DRAWER action', () => {
      const expectedAction = {
        type: OPEN_CREATING_CHARACTER_DRAWER,
      };

      const action = openCreatingCharacterDrawer();

      expect(action).toEqual(expectedAction);
    });
  });

  describe('closeCreatingCharacterDrawer', () => {
    it('should create a CLOSE_CREATING_CHARACTER_DRAWER action', () => {
      const expectedAction = {
        type: CLOSE_CREATING_CHARACTER_DRAWER,
      };

      const action = closeCreatingCharacterDrawer();

      expect(action).toEqual(expectedAction);
    });
  });

  describe('updateNavigation', () => {
    it('should create an UPDATE_NAVIGATION action with true payload', () => {
      const expectedAction = {
        type: UPDATE_NAVIGATION,
        payload: true,
      };

      const action = updateNavigation(true);

      expect(action).toEqual(expectedAction);
    });

    it('should create an UPDATE_NAVIGATION action with false payload', () => {
      const expectedAction = {
        type: UPDATE_NAVIGATION,
        payload: false,
      };

      const action = updateNavigation(false);

      expect(action).toEqual(expectedAction);
    });
  });
});
