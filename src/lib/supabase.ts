import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://scnrhzqqhbtvobbxvbnx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjbnJoenFxaGJ0dm9iYnh2Ym54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNzU4MDIsImV4cCI6MjA3NDY1MTgwMn0.kzmzbVtRTsuUL62Gg1aTkpJ3nzMrU9_mphCn_K1aCkE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Lead {
  id?: string
  name: string
  phone: string
  email: string
  city: string
  payout_method: string
  crypto_token?: string
  brand: string
  model: string
  created_at?: string
  telegram_sent?: boolean
  telegram_sent_at?: string
}
