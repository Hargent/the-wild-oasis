
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yxqroprpmpqbzezdkuyh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4cXJvcHJwbXBxYnplemRrdXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM3MjQwMzIsImV4cCI6MjAwOTMwMDAzMn0.737QcGNTfnwvAO6ftWNXYX_fi0EBNI8r-gBJwP4TLjM"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase