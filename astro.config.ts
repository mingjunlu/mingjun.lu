import cloudflare from '@astrojs/cloudflare';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import { execSync } from 'node:child_process';
import { loadEnv } from 'vite';

// Can’t use `import.meta.env` here. See: https://docs.astro.build/en/guides/configuring-astro/#environment-variables
const { PUBLIC_SITE_URL } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  '',
);

const siteVersion =
  process.env.WORKERS_CI_COMMIT_SHA?.slice(0, 7) ??
  execSync('git log -1 --pretty=format:%h').toString().trim();

const isPreviewBuild =
  process.env.WORKERS_CI_BRANCH !== undefined &&
  process.env.WORKERS_CI_BRANCH !== 'main';

export default defineConfig({
  site: PUBLIC_SITE_URL,
  redirects: {
    '/': {
      status: 307,
      destination: '/blog',
    },
  },
  adapter: cloudflare({
    imageService: 'compile',
  }),
  integrations: [
    icon({
      iconDir: 'src/assets/icons',
      include: {
        'fa6-brands': ['linkedin', 'square-github'],
        'fa6-solid': ['calendar', 'clock', 'eye', 'tag'],
      },
    }),
  ],
  vite: {
    define: {
      __SITE_VERSION__: JSON.stringify(siteVersion),
      __IS_PREVIEW_BUILD__: JSON.stringify(isPreviewBuild),
    },
    optimizeDeps: {
      exclude: ['fsevents'],
    },
  },
  build: {
    format: 'file',
  },
  session: false,
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
