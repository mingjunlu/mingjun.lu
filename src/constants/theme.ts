export const defaultTheme = 'light';

export const themeCookieOptions = {
  path: '/',
  sameSite: 'strict' as const,
  secure: import.meta.env.PROD,
};
