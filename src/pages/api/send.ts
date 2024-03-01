import type { APIContext } from 'astro';
import { z } from 'astro:content';
import { siteUrl } from 'src/constants/site';

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
    referrer: z.string(),
  }),
});

export async function GET(context: APIContext) {
  const { url } = context;

  try {
    const upstreamResponse = await fetch(`${url.origin}/404`);
    const html = await upstreamResponse.text();
    return new Response(html, {
      status: 404,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 404 });
  }
}

export async function POST(context: APIContext) {
  const { request, url } = context;

  const isProduction = url.hostname === new URL(siteUrl).hostname;
  const apiUrl = import.meta.env.ANALYTICS_API_URL;
  if (!isProduction || !apiUrl) {
    return new Response(null, { status: 405 });
  }

  try {
    const requestBody = await request.clone().json();
    RequestBodySchema.parse(requestBody);
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 400 });
  }

  try {
    const upstreamResponse = await fetch(apiUrl, request);
    if (!upstreamResponse.ok) {
      throw new Error(
        `${upstreamResponse.status} ${upstreamResponse.statusText}`,
      );
    }
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 502 });
  }
}
