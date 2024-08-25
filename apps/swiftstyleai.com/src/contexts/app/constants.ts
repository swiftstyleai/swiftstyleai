const createSymbol = (name: string) => `contexts/app/${name}`;

/**
 * CREATING CHARACTER DRAWER
 */
export const OPEN_CREATING_CHARACTER_DRAWER = createSymbol(
  'OPEN_CREATING_CHARACTER_DRAWER'
);

export const CLOSE_CREATING_CHARACTER_DRAWER = createSymbol(
  'CLOSE_CREATING_CHARACTER_DRAWER'
);

/**
 * NAVIGATING
 */

export const UPDATE_NAVIGATION = createSymbol('UPDATE_NAVIGATION');
