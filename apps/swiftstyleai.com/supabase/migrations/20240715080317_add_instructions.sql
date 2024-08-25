--------------- INSTRUCTIONS ---------------

-- TABLE --
CREATE TABLE IF NOT EXISTS instructions (
  -- ID
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- RELATIONSHIPS
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  -- METADATA
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  -- SHARING

  -- REQUIRED
  text TEXT NOT NULL CHECK (char_length(text) <= 160)
);

-- INDEXES --
CREATE INDEX idx_instructions_user_id ON instructions (user_id);

CREATE INDEX idx_instructions_character_id ON instructions (character_id);

-- RLS --
ALTER TABLE
  instructions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to own instructions" ON instructions USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- FUNCTIONS --

-- TRIGGERS --

CREATE TRIGGER update_instructions_updated_at
BEFORE UPDATE ON instructions
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
