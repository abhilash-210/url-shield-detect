
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if the required values are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase URL and Anon Key are required. Make sure you've set the VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables."
  );
}

// Create a Supabase client with mock client fallback for development/preview
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabaseClient();

// Mock Supabase client for development/preview when credentials are not available
function createMockSupabaseClient() {
  console.warn("Using mock Supabase client. Authentication and database operations will not work.");
  
  // This is a mock implementation that prevents errors but doesn't actually connect to Supabase
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ subscription: { unsubscribe: () => {} } }),
      signInWithPassword: () => Promise.resolve({ data: {}, error: new Error("Mock: No authentication available") }),
      signUp: () => Promise.resolve({ data: {}, error: new Error("Mock: No authentication available") }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => ({
        eq: () => ({ order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }) }),
        lt: () => Promise.resolve({ count: 0, error: null }),
        count: () => Promise.resolve({ count: 0, error: null }),
        single: () => Promise.resolve({ data: null, error: null }),
        order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) })
      }),
      insert: () => Promise.resolve({ data: null, error: null })
    }),
    channel: () => ({
      on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) })
    })
  };
}
