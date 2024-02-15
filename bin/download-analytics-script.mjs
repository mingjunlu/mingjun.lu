import { writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

/* eslint-env node */

(async () => {
  const scriptUrl = 'https://beamanalytics.b-cdn.net/beam.min.js';
  const fileName = 'beam.min.js';
  const filePath = resolve(join(process.cwd(), `public/${fileName}`));

  try {
    const response = await fetch(scriptUrl);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    writeFileSync(filePath, Buffer.from(buffer));
  } catch (error) {
    console.error('Failed to download analytics script.', error);
    process.exit(1);
  }
})();
