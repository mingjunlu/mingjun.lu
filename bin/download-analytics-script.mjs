import 'dotenv/config';
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

/* eslint-env node */

(async () => {
  const scriptUrl = process.env.ANALYTICS_SCRIPT_URL;
  const commitHash =
    process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
    execSync('git log -1 --pretty=format:%h').toString().trim();
  const fileName = `umm.${commitHash}.min.js`;
  const filePath = resolve(join(process.cwd(), `public/${fileName}`));

  try {
    if (!scriptUrl) {
      writeFileSync(filePath, '');
      console.warn(
        'Invalid analytics script URL. An empty file is created to avoid errors.\n',
      );
      process.exit(0);
    }
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
