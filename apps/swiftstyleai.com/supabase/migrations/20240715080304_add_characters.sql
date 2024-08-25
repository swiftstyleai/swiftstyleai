--------------- CHARACTERS ---------------

-- TABLE --
CREATE TABLE IF NOT EXISTS characters (
  -- ID
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- RELATIONSHIPS
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- METADATA
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  -- SHARING
  sharing TEXT NOT NULL DEFAULT 'private',
  -- REQUIRED
  -- default_context_length INTEGER NOT NULL,
  -- default_model TEXT NOT NULL CHECK (char_length(default_model) <= 1000),
  -- default_prompt TEXT NOT NULL CHECK (char_length(default_prompt) <= 100000),
  -- default_temperature REAL NOT NULL,
  -- embeddings_provider TEXT NOT NULL CHECK (char_length(embeddings_provider) <= 1000),
  -- include_profile_context BOOLEAN NOT NULL,
  -- include_workspace_instructions BOOLEAN NOT NULL,
  -- instructions TEXT NOT NULL CHECK (char_length(instructions) <= 1500),
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  name TEXT NOT NULL CHECK (char_length(name) <= 60),
  description TEXT NOT NULL CHECK (char_length(description) <= 160)
);

-- INDEXES --
CREATE INDEX idx_characters_user_id ON characters (user_id);

CREATE UNIQUE INDEX idx_unique_default_character_per_user ON characters(user_id)
WHERE
  is_default;

-- RLS --
ALTER TABLE
  characters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to own characters" ON characters USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Allow view access to non-private characters" ON characters FOR
SELECT
  USING (sharing <> 'private');

-- FUNCTIONS --

-- TRIGGERS --

CREATE TRIGGER update_characters_updated_at
BEFORE UPDATE ON characters
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE OR REPLACE FUNCTION prevent_default_character_deletion()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.is_default THEN
    RAISE EXCEPTION 'Default character deletion is not allowed.';
  END IF;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_character_and_instructions()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_character_id UUID;
BEGIN
  -- Insert new record into characters
  INSERT INTO public.characters(
    user_id,
    name,
    description,
    is_default,
    is_active
  )
  VALUES (
    NEW.id,
    'Tweet Style',
    'Concise and impactful guidelines for crafting engaging and shareable tweets within the character limit.',
    TRUE,
    TRUE
  )
  RETURNING id INTO new_character_id;

  -- Insert new records into instructions
  INSERT INTO public.instructions(
    user_id,
    character_id,
    text
  )
  VALUES
    (NEW.id, new_character_id, 'Act as a Twitter expert.'),
    (NEW.id, new_character_id, 'Ensure your tweet do not include hashtags.'),
    (NEW.id, new_character_id, 'Keep tweet content under 280 characters.');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_character_and_instructions_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.create_character_and_instructions();
