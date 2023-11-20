import vercel from '@astrojs/vercel/serverless';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

// Can’t use `import.meta.env` here. See: https://docs.astro.build/en/guides/configuring-astro/#environment-variables
const { PUBLIC_SITE_URL } = loadEnv(
  /* eslint-disable no-undef */
  process.env.NODE_ENV,
  process.cwd(),
  '',
  /* eslint-enable no-undef */
);

export default defineConfig({
  redirects: {
    '/': {
      status: 307,
      destination: '/blog',
    },
  },
  site: PUBLIC_SITE_URL,
  output: 'server',
  adapter: vercel(),
  integrations: [
    icon({
      iconDir: 'src/assets/icons',
      include: {
        'fa6-brands': ['linkedin', 'square-github'],
        'fa6-solid': ['calendar', 'clock', 'eye', 'tag'],
      },
    }),
  ],
});
