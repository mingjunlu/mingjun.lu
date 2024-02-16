import { siteName, siteVersion } from 'src/constants/site';

export const prerender = true;

export function GET() {
  return new Response(
    JSON.stringify({
      name: siteName,
      short_name: siteName.split(' ').at(0),
      icons: [
        {
          src: `/icon-192.png?v=${siteVersion}`,
          type: 'image/png',
          sizes: '192x192',
        },
        {
          src: `/icon-512.png?v=${siteVersion}`,
          type: 'image/png',
          sizes: '512x512',
        },
      ],
    }),
  );
}
