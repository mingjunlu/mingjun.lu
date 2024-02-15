import { execSync } from 'node:child_process';

export const siteName = import.meta.env.PUBLIC_SITE_NAME;

export const siteVersion =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
  execSync('git log -1 --pretty=format:%h').toString().trim();

export const siteUrl = import.meta.env.PUBLIC_SITE_URL;
