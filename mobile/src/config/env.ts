import 'react-native-url-polyfill/auto';

export const ENV = {
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://vvubaqheeokfhwcoxchi.supabase.co',
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2dWJhcWhlZW9rZmh3Y294Y2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NjI3MzEsImV4cCI6MjA4OTEzODczMX0',
  
  FEATURES: {
    JOBS_BOARD: true,
    BACKLOADS: true,
    EQUIPMENT: true,
    DIRECTORY: true,
    AI_SEARCH: true,
  },
  
  APP_NAME: 'TransConnect',
  APP_VERSION: '1.0.0',
};
