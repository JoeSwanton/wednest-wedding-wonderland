
interface AppConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  apiUrl: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  appName: string;
  appVersion: string;
  enableAnalytics: boolean;
  enableErrorReporting: boolean;
  maxImageSize: number;
  supportedImageTypes: string[];
}

const config: AppConfig = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  apiUrl: import.meta.env.VITE_API_URL || '',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  appName: 'Enosi',
  appVersion: '1.0.0',
  enableAnalytics: import.meta.env.PROD,
  enableErrorReporting: import.meta.env.PROD,
  maxImageSize: 5 * 1024 * 1024, // 5MB
  supportedImageTypes: ['image/jpeg', 'image/png', 'image/webp']
};

export default config;
