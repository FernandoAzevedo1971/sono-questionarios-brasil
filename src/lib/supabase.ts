
import { createClient } from '@supabase/supabase-js';

// When using Lovable's Supabase integration, these values are automatically injected
// during the build process, so we can hardcode them here
const supabaseUrl = 'https://xeymgmuljwxeagpqkzhx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleW1nbXVsand4ZWFncHFremh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3Nzc2OTgsImV4cCI6MjAzMTM1MzY5OH0.yDLVQnaTauMsArL7O2WTGjvb1ySzppGN_Z-ET1ZkZJA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
