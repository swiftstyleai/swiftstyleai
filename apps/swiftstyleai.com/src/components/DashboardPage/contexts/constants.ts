const createSymbol = (name: string) => `dashboard-page/${name}`;

export const FETCH_CHARACTERS_REQUEST = createSymbol(
  'FETCH_CHARACTERS_REQUEST'
);
export const FETCH_CHARACTERS_SUCCESS = createSymbol(
  'FETCH_CHARACTERS_SUCCESS'
);
export const FETCH_CHARACTERS_FAILURE = createSymbol(
  'FETCH_CHARACTERS_FAILURE'
);

export const ADD_CHARACTER = createSymbol('ADD_CHARACTER');
