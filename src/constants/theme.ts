export const defaultTheme = 'dark';

export const themeCookieOptions = {
  path: '/',
  sameSite: 'strict' as const,
  secure: import.meta.env.PROD,
};
