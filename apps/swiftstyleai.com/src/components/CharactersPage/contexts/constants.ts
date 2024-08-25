const createSymbol = (name: string) => `characters/${name}`;

export const FETCH_CHARACTERS_REQUEST = createSymbol(
  'FETCH_CHARACTERS_REQUEST'
);
export const FETCH_CHARACTERS_SUCCESS = createSymbol(
  'FETCH_CHARACTERS_SUCCESS'
);
export const FETCH_CHARACTERS_FAILURE = createSymbol(
  'FETCH_CHARACTERS_FAILURE'
);

export const DELETE_CHARACTER = createSymbol('DELETE_CHARACTER');

export const ADD_CHARACTER = createSymbol('ADD_CHARACTER');

export const UPDATE_CHARACTER = createSymbol('UPDATE_CHARACTER');
