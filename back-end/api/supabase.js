// backend/supabase.js
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Carregar variáveis de ambiente
dotenv.config();

// Verificar se as variáveis estão sendo carregadas corretamente
console.log("SUPABASE_URL:", process.env.EXPO_PUBLIC_SUPABASE_URL);
console.log("SUPABASE_ANON_KEY:", process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);

// Garantir que as variáveis foram carregadas
if (!process.env.EXPO_PUBLIC_SUPABASE_URL || !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Variáveis de ambiente do Supabase não foram carregadas corretamente.');
}

// Criar cliente do Supabase
const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL, 
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
);

export default supabase;
