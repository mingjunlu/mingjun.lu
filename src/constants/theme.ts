export const defaultTheme = 'dark';

export const themeCookieOptions = {
  path: '/',
  sameSite: 'Strict' as const,
  secure: import.meta.env.PROD,
};
