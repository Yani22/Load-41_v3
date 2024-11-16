import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pbatnkmpnfrdhpztumet.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiYXRua21wbmZyZGhwenR1bWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzOTY5MTYsImV4cCI6MjA0MDk3MjkxNn0.Lgl9rRlzmuCmEO4yKOqcu1Ex6HxvgSKvfxElu5w_cuw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)