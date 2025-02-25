// backend/supabase.js
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Carregar variáveis de ambiente
dotenv.config();

// Garantir que as variáveis foram carregadas
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error('Variáveis de ambiente do Supabase não foram carregadas corretamente.');
}

// Criar cliente do Supabase
const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_ANON_KEY
);

export default supabase;
