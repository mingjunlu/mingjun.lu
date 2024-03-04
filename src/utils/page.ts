import fs from 'node:fs/promises';
import path from 'node:path';

export async function getErrorPage(status: 404 | 500): Promise<string> {
  const isDevelopment = import.meta.env.DEV;

  try {
    const html = isDevelopment
      ? await fetch(`${import.meta.env.SITE}/${status}`).then((response) => {
          return response.text();
        })
      : await fs.readFile(
          path.join(
            process.cwd(),
            `./vercel/path0/.vercel/output/static/${status}.html`,
          ),
          { encoding: 'utf8' },
        );
    return html.trim();
  } catch (error) {
    console.error(error);
    return '';
  }
}
