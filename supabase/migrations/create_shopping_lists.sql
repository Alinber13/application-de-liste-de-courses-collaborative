/*
  # Create shopping lists tables and security

  1. New Tables:
    - shopping_lists (id, name, owner_id, shared_with, items, created_at, updated_at)
    - profiles (id, email, created_at, updated_at)

  2. Security:
    - Enable RLS on both tables
    - Policies for CRUD operations
    - Users can read their own lists and shared lists
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create shopping_lists table
CREATE TABLE IF NOT EXISTS shopping_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_id UUID REFERENCES profiles(id) NOT NULL,
  shared_with UUID[] DEFAULT '{}',
  items JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_lists ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Shopping lists policies
CREATE POLICY "Users can view own lists" 
  ON shopping_lists FOR SELECT 
  USING (owner_id = auth.uid() OR auth.uid() = ANY(shared_with));

CREATE POLICY "Users can create lists" 
  ON shopping_lists FOR INSERT 
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own lists" 
  ON shopping_lists FOR UPDATE 
  USING (owner_id = auth.uid() OR auth.uid() = ANY(shared_with));

CREATE POLICY "Users can delete own lists" 
  ON shopping_lists FOR DELETE 
  USING (owner_id = auth.uid());

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shopping_lists_updated_at 
  BEFORE UPDATE ON shopping_lists 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS shopping_lists_owner_id_idx ON shopping_lists(owner_id);
CREATE INDEX IF NOT EXISTS shopping_lists_shared_with_idx ON shopping_lists USING gin(shared_with);
