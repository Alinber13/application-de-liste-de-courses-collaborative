import '@testing-library/jest-dom'

// Mock Supabase
jest.mock('@supabase/supabase-js', () => {
  const mockSupabase = {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn(),
  }
  return {
    createClient: jest.fn(() => mockSupabase),
  }
})
