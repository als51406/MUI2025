import { createTheme, ThemeOptions } from '@mui/material/styles';

// 라이트 모드 테마
export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#5932EA',
      light: '#7B5BF5',
      dark: '#4528C7',
    },
    secondary: {
      main: '#16C098',
      light: '#4CD3B3',
      dark: '#12A77F',
    },
    background: {
      default: '#FAFBFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#292D32',
      secondary: '#757575',
    },
    divider: '#E0E0E0',
  },
  typography: {
    fontFamily: '"Poppins", "Noto Sans KR", "Roboto", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.08)',
    '0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 12px 24px rgba(0, 0, 0, 0.12)',
    '0px 16px 32px rgba(0, 0, 0, 0.14)',
    '0px 20px 40px rgba(0, 0, 0, 0.16)',
    '0px 24px 48px rgba(0, 0, 0, 0.18)',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
  ],
};

// 다크 모드 테마
export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#7B5BF5',
      light: '#9B7FF7',
      dark: '#5932EA',
    },
    secondary: {
      main: '#4CD3B3',
      light: '#6DDEC4',
      dark: '#16C098',
    },
    background: {
      default: '#1A1D1F',
      paper: '#272B30',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    divider: '#3A3F47',
  },
  typography: {
    fontFamily: '"Poppins", "Noto Sans KR", "Roboto", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '0px 4px 8px rgba(0, 0, 0, 0.25)',
    '0px 8px 16px rgba(0, 0, 0, 0.3)',
    '0px 12px 24px rgba(0, 0, 0, 0.35)',
    '0px 16px 32px rgba(0, 0, 0, 0.4)',
    '0px 20px 40px rgba(0, 0, 0, 0.45)',
    '0px 24px 48px rgba(0, 0, 0, 0.5)',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
  ],
};

export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme(mode === 'light' ? lightTheme : darkTheme);
};
