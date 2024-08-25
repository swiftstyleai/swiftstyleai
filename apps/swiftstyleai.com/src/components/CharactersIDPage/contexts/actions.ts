import {
  ADD_INSTRUCTION,
  DELETE_INSTRUCTION,
  FETCH_INSTRUCTIONS_FAILURE,
  FETCH_INSTRUCTIONS_REQUEST,
  FETCH_INSTRUCTIONS_SUCCESS,
  UPDATE_CHARACTER,
} from './constants';
import { type Character, type Instruction } from './types';

export const fetchInstructionsRequest = (characterId: string) => ({
  type: FETCH_INSTRUCTIONS_REQUEST,
  payload: characterId,
});

export interface FetchInstructionsSuccessParams {
  instructions: Instruction[];
  character: Character;
}

export const fetchInstructionsSuccess = (
  data: FetchInstructionsSuccessParams
) => ({
  type: FETCH_INSTRUCTIONS_SUCCESS,
  payload: data,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchInstructionsFailure = (error: any) => ({
  type: FETCH_INSTRUCTIONS_FAILURE,
  payload: error,
  error: true,
});

export const addInstruction = (data: Instruction) => ({
  type: ADD_INSTRUCTION,
  payload: data,
});

export const deleteInstruction = (instructionId: string) => ({
  type: DELETE_INSTRUCTION,
  payload: instructionId,
});

export const updateCharacter = (data: Character) => ({
  type: UPDATE_CHARACTER,
  payload: data,
});
