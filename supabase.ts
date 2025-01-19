import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabaseUrl = 'https://hrrixouqeulmxuhssneb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhycml4b3VxZXVsbXh1aHNzbmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMDc3MTgsImV4cCI6MjA1Mjc4MzcxOH0.fHMR3QJE4av5n33L-hOiz7v03ZN5opRVDh0wLOd9H-8';

export const supabase = createClient(supabaseUrl, supabaseKey);
