-- Supabase Leads Table Setup
-- Run this SQL in your Supabase SQL Editor

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  payout_method TEXT NOT NULL,
  crypto_token TEXT,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  telegram_sent BOOLEAN DEFAULT FALSE,
  telegram_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_telegram_sent ON leads(telegram_sent);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for form submissions)
CREATE POLICY "Allow public inserts" ON leads
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reads (for admin access)
CREATE POLICY "Allow public reads" ON leads
  FOR SELECT USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_leads_updated_at 
  BEFORE UPDATE ON leads 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
