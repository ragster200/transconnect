// TransConnect - Environment Configuration
export const ENV = {
  // Supabase Configuration
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://vvubaqheeokfhwcoxchi.supabase.co',
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  
  // Features
  FEATURES: {
    JOBS_BOARD: true,
    BACKLOADS: true,
    EQUIPMENT: true,
    DIRECTORY: true,
    AI_SEARCH: true,
  },
  
  // API
  API_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8001/api',
  
  // App Info
  APP_NAME: 'TransConnect',
  APP_VERSION: '1.0.0',
};