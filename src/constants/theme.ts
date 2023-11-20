export const defaultTheme = 'light';

export const themeCookieOptions = {
  path: '/',
  sameSite: 'Strict' as const,
  secure: import.meta.env.PROD,
};
