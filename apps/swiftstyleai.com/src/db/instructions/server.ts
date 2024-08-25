import { createClient } from '@/lib/supabase/server';

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

export const getInstructionsByCharacterIds = async (characterIds: string[]) => {
  const supabase = createClient();

  const { data, error: errorSession } = await supabase.auth.getUser();

  if (errorSession) {
    throw new Error(errorSession.message);
  }

  const { data: instructions, error: errorQuery } = await supabase
    .from('instructions')
    .select('*')
    .eq('user_id', data.user.id)
    .in('character_id', characterIds) // Use the 'in' operator for an array of IDs
    .order('created_at', { ascending: true }); // Sort by created_at in ascending order

  if (errorQuery) {
    throw new Error(errorQuery.message);
  }

  return instructions;
};

export const getInstructionsForActiveCharacters = async () => {
  const supabase = createClient();

  // Get the current user
  const { data: userData, error: errorSession } = await supabase.auth.getUser();
  if (errorSession) {
    throw new Error(errorSession.message);
  }

  // Fetch instructions for active characters with a join
  const { data: instructions, error: errorInstructions } = await supabase
    .from('instructions')
    .select(
      `
      id,
      text,
      created_at,
      updated_at,
      character_id,
      characters!inner (
        id,
        user_id,
        is_active
      )
    `
    )
    .eq('user_id', userData.user.id)
    .eq('characters.is_active', true)
    .order('created_at', { ascending: true });

  if (errorInstructions) {
    throw new Error(errorInstructions.message);
  }

  return instructions;
};
