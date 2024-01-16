/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly PUBLIC_BEAM_ANALYTICS_TOKEN: string;
  readonly PUBLIC_SITE_NAME: string;
  readonly PUBLIC_SITE_URL: string;
  readonly UPSTASH_REDIS_REST_TOKEN: string;
  readonly UPSTASH_REDIS_REST_URL: string;
}
