/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly ANALYTICS_API_URL?: string;
  readonly ANALYTICS_SCRIPT_URL?: string;
  readonly PUBLIC_ANALYTICS_ID?: string;
  readonly PUBLIC_SITE_NAME: string;
  readonly PUBLIC_SITE_URL: string;
  readonly UPSTASH_REDIS_REST_TOKEN: string;
  readonly UPSTASH_REDIS_REST_URL: string;
}
