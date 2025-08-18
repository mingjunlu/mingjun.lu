export async function GET() {
  try {
    const url =
      'https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/refs/heads/main/robots.txt';
    const response = await fetch(url);
    const text = await response.text();
    return new Response(text);
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 404 });
  }
}
