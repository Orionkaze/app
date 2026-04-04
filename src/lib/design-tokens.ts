// Loyalty Platform Design Tokens
// Premium black-and-pink aesthetic with glassmorphism

export const colors = {
  // Backgrounds
  bgPrimary: '#0A0A0A',
  bgSecondary: '#1A1A2E',
  bgTertiary: '#12121F',
  bgCard: 'rgba(255, 255, 255, 0.04)',

  // Accent / Brand
  pink: {
    50: '#FFF0F7',
    100: '#FFE0F0',
    200: '#FFC2E0',
    300: '#FF85C0',
    400: '#F55FA0',
    500: '#E91E8C',
    600: '#C71678',
    700: '#A31264',
    800: '#7A0E4B',
    900: '#520A33',
  },

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B8',
  textMuted: '#6B6B80',

  // Borders
  border: '#2D2D44',
  borderPink: 'rgba(233, 30, 140, 0.15)',
  borderPinkStrong: 'rgba(233, 30, 140, 0.4)',

  // Semantic
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
} as const;

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  24: '96px',
} as const;

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;

export const typography = {
  fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const shadows = {
  card: '0 8px 32px rgba(0, 0, 0, 0.5)',
  glow: '0 0 0 3px rgba(233, 30, 140, 0.2)',
  glowStrong: '0 0 24px rgba(233, 30, 140, 0.3)',
} as const;

export const glassmorphism = {
  background: 'rgba(255, 255, 255, 0.04)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(233, 30, 140, 0.15)',
  shadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
} as const;

// 14 supported categories at launch
export const CATEGORIES = [
  { name: 'All', emoji: '✨' },
  { name: 'Cafe', emoji: '☕' },
  { name: 'Restaurant', emoji: '🍽️' },
  { name: 'Salon', emoji: '💇' },
  { name: 'Gym', emoji: '💪' },
  { name: 'Clothing', emoji: '👗' },
  { name: 'Electronics', emoji: '📱' },
  { name: 'Pharmacy', emoji: '💊' },
  { name: 'Spa', emoji: '🧖' },
  { name: 'Bakery', emoji: '🍰' },
  { name: 'Supermarket', emoji: '🛒' },
  { name: 'Bookstore', emoji: '📚' },
  { name: 'Gaming', emoji: '🎮' },
  { name: 'Fitness', emoji: '🏃' },
  { name: 'Hotels', emoji: '🏨' },
] as const;
