import { HttpStatus } from '@/lib/constants';
import { type Action } from '@/lib/middlewares/types';

import { type FetchInstructionsSuccessParams } from '../actions';
import { type InitialCharactersIDPageState, type Instruction } from '../types';

export const handleFetchInstructionsRequest = (
  state: InitialCharactersIDPageState,
  action: Action<string> | undefined
): InitialCharactersIDPageState => {
  if (!action) {
    return state;
  }
  const characterId = action.payload;
  if (!characterId) {
    return state;
  }

  return {
    ...state,
    fetchStatus: HttpStatus.LOADING,
    errors: null,
    character: null,
    characterId,
  };
};

export const handleFetchInstructionsSuccess = (
  state: InitialCharactersIDPageState,
  action: Action<FetchInstructionsSuccessParams> | undefined
): InitialCharactersIDPageState => {
  if (!action || !action.payload) {
    return state;
  }

  const { instructions, character } = action.payload;
  if (!instructions || !character) {
    return state;
  }
  const list: string[] = [];
  const data: Record<string, Instruction> = {};

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    if (instruction && instruction.id) {
      list.push(instruction.id);
      data[instruction.id] = instruction;
    }
  }

  return {
    ...state,
    fetchStatus: HttpStatus.LOADED,
    errors: null,
    list,
    data,
    character,
  };
};

export const handleAddingInstruction = (
  state: InitialCharactersIDPageState,
  action: Action<Instruction> | undefined
): InitialCharactersIDPageState => {
  if (!action || !action.payload) {
    return state;
  }

  const instruction = action.payload;
  const { list, data } = state;

  // Determine if the instruction is new
  const isNewInstruction = !data[instruction.id];

  // Create new list and data with the instruction added or updated
  const newList = isNewInstruction ? [...list, instruction.id] : list;
  const newData = {
    ...data,
    [instruction.id]: instruction,
  };

  return {
    ...state,
    fetchStatus: HttpStatus.LOADED,
    errors: null,
    list: newList,
    data: newData,
  };
};

export const handleDeletingInstruction = (
  state: InitialCharactersIDPageState,
  action: Action<string> | undefined
): InitialCharactersIDPageState => {
  if (!action || !action.payload) {
    return state;
  }

  const instructionId = action.payload;
  const { list, data } = state;

  // Filter the list to remove the instruction ID
  const newList = list.filter((id: string) => id !== instructionId);

  // Create a new data object without the deleted instruction
  const { [instructionId]: _, ...newData } = data;

  return {
    ...state,
    fetchStatus: HttpStatus.LOADED,
    errors: null,
    list: newList,
    data: newData,
  };
};
