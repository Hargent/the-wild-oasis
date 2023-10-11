import { createClient } from "@supabase/supabase-js";

console.log(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY
);
const supabaseUSER = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY
);
const supabaseADMIN = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ADMIN_KEY
);
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export { supabaseUSER, supabaseADMIN };
