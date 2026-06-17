// import { createClient } from 'jsr:@supabase/supabase-js@2'
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const SUPABASE_URL = "https://qiwstqpznabemqttivoa.supabase.co"
const SUPABASE_KEY = "sb_publishable_cDOxkol6uWGhuAg564EmdQ_v3uhSeYQ"
const SupaBaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)

export { SupaBaseClient }
