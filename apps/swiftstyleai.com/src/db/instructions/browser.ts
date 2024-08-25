import { createClient } from '@/lib/supabase/client';

import { TablesInsert } from '../types';

export const getInstructionsByCharacterId = async (characterId: string) => {
  const supabase = createClient();

  const { data, error: errorSession } = await supabase.auth.getUser();

  if (errorSession) {
    throw new Error(errorSession.message);
  }

  const { data: instructions, error } = await supabase
    .from('instructions')
    .select('*')
    .eq('user_id', data.user.id)
    .eq('character_id', characterId)
    .order('created_at', { ascending: true }); // Sort by created_at in ascending order

  if (error) {
    throw new Error(error.message);
  }

  return instructions;
};

export const updateInstructionText = async (
  instructionId: string,
  newText: string
) => {
  const supabase = createClient();

  // Update the instruction with the given ID and new text
  const { data: updatedInstruction, error } = await supabase
    .from('instructions')
    .update({ text: newText, updated_at: new Date() })
    .eq('id', instructionId)
    .select('*')
    .single();

  // Handle any errors during the update operation
  if (error) {
    throw new Error(error.message);
  }

  // Return the updated instruction data
  return updatedInstruction;
};

// Function to create a new instruction
export const createInstruction = async (
  instruction: Omit<TablesInsert<'instructions'>, 'user_id'>
) => {
  const supabase = createClient();

  const { data, error: errorSession } = await supabase.auth.getUser();

  if (errorSession) {
    throw new Error(errorSession.message);
  }

  // Use the supabase client to insert a new instruction into the 'instructions' table
  const { data: createdInstruction, error } = await supabase
    .from('instructions')
    .insert([
      {
        ...instruction,
        user_id: data.user.id,
      },
    ])
    .select('*')
    .single();

  // Handle any errors that occur during the insertion
  if (error) {
    throw new Error(error.message);
  }

  // Return the created instruction data
  return createdInstruction;
};

export const deleteInstruction = async (instructionId: string) => {
  const supabase = createClient();

  const { data: _, error: errorSession } = await supabase.auth.getUser();

  if (errorSession) {
    throw new Error(errorSession.message);
  }

  const { error } = await supabase
    .from('instructions') // Specify the table to operate on
    .delete() // Specify the delete operation
    .eq('id', instructionId); // Add a condition to match the instruction ID

  if (error) {
    throw new Error(`Failed to delete instruction: ${error.message}`);
  }

  return true;
};
