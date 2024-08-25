import supabase from '@/lib/supabase/client';

import { type TablesInsert } from '../types';

export const getCharacters = async () => {
  // Get the current user
  const { data, error: errorSession } = await supabase.auth.getUser();
  if (errorSession) {
    throw new Error(errorSession.message);
  }

  const { data: characters, error } = await supabase
    .from('characters')
    .select('*')
    .eq('user_id', data.user.id)
    .order('created_at', { ascending: true }); // Sort by created_at in ascending order

  if (error) {
    throw new Error(error.message);
  }

  return characters;
};

export const getCharacterById = async (id: string) => {
  // Get the current user
  const { data: userData, error: errorSession } = await supabase.auth.getUser();
  if (errorSession) {
    throw new Error(errorSession.message);
  }

  // Fetch the Character with the specified ID
  const { data: character, error: errorInstruction } = await supabase
    .from('characters')
    .select('*')
    .eq('user_id', userData.user.id)
    .eq('id', id)
    .single(); // Ensure only one record is returned

  if (errorInstruction) {
    throw new Error(errorInstruction.message);
  }

  return character;
};

export const createCharacter = async (
  character: Omit<TablesInsert<'characters'>, 'user_id'>,
) => {
  const { data, error: errorSession } = await supabase.auth.getUser();

  if (errorSession) {
    throw new Error(errorSession.message);
  }

  // Use the supabase client to insert a new character into the 'characters' table
  const { data: createdCharacter, error } = await supabase
    .from('characters')
    .insert([
      {
        ...character,
        user_id: data.user.id,
      },
    ])
    .select('*')
    .single();

  // Handle any errors that occur during the insertion
  if (error) {
    throw new Error(error.message);
  }

  // Return the created character data
  return createdCharacter;
};

export const deleteCharacter = async (characterId: string) => {
  const { data: _, error: errorSession } = await supabase.auth.getUser();

  if (errorSession) {
    throw new Error(errorSession.message);
  }

  const { error } = await supabase
    .from('characters') // Specify the table to operate on
    .delete() // Specify the delete operation
    .eq('id', characterId); // Add a condition to match the character id

  if (error) {
    throw new Error(`Failed to delete character: ${error.message}`);
  }

  return true;
};

// Define the type for updating character
export type UpdateCharacterParams = {
  characterId: string;
  isActive: boolean;
};

export const updateCharacterStatus = async ({
  characterId,
  isActive,
}: UpdateCharacterParams) => {
  // Update the is_active status of the writing style with the given ID
  const { data: updatedCharacter, error } = await supabase
    .from('characters')
    .update({ is_active: isActive })
    .eq('id', characterId)
    .select('*')
    .single();

  // Handle any errors during the update operation
  if (error) {
    throw new Error(error.message);
  }

  // Return the updated writing style data
  return updatedCharacter;
};
