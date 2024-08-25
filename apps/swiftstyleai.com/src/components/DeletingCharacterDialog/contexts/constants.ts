const createSymbol = (name: string) =>
  `components/DeletingCharacterDialog/${name}`;

/**
 * DELETING CHARACTER DRAWER
 */
export const OPEN_DELETING_CHARACTER_DIALOG = createSymbol(
  'OPEN_DELETING_CHARACTER_DIALOG'
);

export const CLOSE_DELETING_CHARACTER_DIALOG = createSymbol(
  'CLOSE_DELETING_CHARACTER_DIALOG'
);

export const SEND_DELETING_CHARACTER_REQUEST = createSymbol(
  'SEND_DELETING_CHARACTER_REQUEST'
);

export const SEND_DELETING_CHARACTER_SUCCESS = createSymbol(
  'SEND_DELETING_CHARACTER_SUCCESS'
);

export const SEND_DELETING_CHARACTER_FAILURE = createSymbol(
  'SEND_DELETING_CHARACTER_FAILURE'
);
