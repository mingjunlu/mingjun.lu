import type { APIContext } from 'astro';
import { z } from 'astro:content';
import { siteUrl } from 'src/constants/site';
import { getErrorPage } from 'src/utils/page';

export const prerender = false;

// See: https://github.com/umami-software/umami/blob/master/src/tracker/index.d.ts
const RequestBodySchema = z.object({
  type: z.string(),
  payload: z.object({
    website: z.string(),
    hostname: z.string(),
    screen: z.string(),
    language: z.string(),
    title: z.string(),
    url: z.string(),
    referrer: z.string().optional(),
  }),
});

export async function GET() {
  const status = 404;
  const html = await getErrorPage(status);
  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

export async function POST(context: APIContext) {
  const { request, url } = context;

  const isProduction = url.hostname === new URL(siteUrl).hostname;
  const apiUrl = import.meta.env.ANALYTICS_API_URL;
  if (!isProduction || !apiUrl) {
    return new Response(null, { status: 405 });
  }

  try {
    RequestBodySchema.parse(await request.clone().json());
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 400 });
  }

  try {
    const upstreamResponse = await fetch(apiUrl, request.clone());
    if (!upstreamResponse.ok) {
      throw new Error(
        `${upstreamResponse.status} ${upstreamResponse.statusText}`,
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 502 });
  }

  return new Response(null, { status: 200 });
}
