import {
  CLOSE_CREATING_CHARACTER_DRAWER,
  OPEN_CREATING_CHARACTER_DRAWER,
  UPDATE_NAVIGATION,
} from './constants';

/**
 * CREATING CHARACTER DRAWER
 */
export const openCreatingCharacterDrawer = () => ({
  type: OPEN_CREATING_CHARACTER_DRAWER,
});

export const closeCreatingCharacterDrawer = () => ({
  type: CLOSE_CREATING_CHARACTER_DRAWER,
});

/**
 * NAVIGATING
 */
export const updateNavigation = (state: boolean) => ({
  type: UPDATE_NAVIGATION,
  payload: state,
});
