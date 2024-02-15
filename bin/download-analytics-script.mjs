import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

/* eslint-env node */

(async () => {
  const scriptUrl = 'https://beamanalytics.b-cdn.net/beam.min.js';
  const commitHash =
    process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
    execSync('git log -1 --pretty=format:%h').toString().trim();
  const fileName = `ba.${commitHash}.min.js`;
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
