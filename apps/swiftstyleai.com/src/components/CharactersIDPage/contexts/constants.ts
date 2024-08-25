const createSymbol = (name: string) => `characters-id/${name}`;

export const FETCH_INSTRUCTIONS_REQUEST = createSymbol(
  'FETCH_INSTRUCTIONS_REQUEST'
);
export const FETCH_INSTRUCTIONS_SUCCESS = createSymbol(
  'FETCH_INSTRUCTIONS_SUCCESS'
);
export const FETCH_INSTRUCTIONS_FAILURE = createSymbol(
  'FETCH_INSTRUCTIONS_FAILURE'
);

export const ADD_INSTRUCTION = createSymbol('ADD_INSTRUCTION');

export const UPDATE_CHARACTER = createSymbol('UPDATE_CHARACTER');

export const DELETE_INSTRUCTION = createSymbol('DELETE_INSTRUCTION');
