import fs from 'node:fs';
import path from 'node:path';

function parseDotEnv(text) {
  const values = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const eqIndex = line.indexOf('=');
    if (eqIndex <= 0) {
      continue;
    }

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }
  return values;
}

export function getOpenAIApiKey() {
  const processKey = process.env.OPENAI_API_KEY?.trim();
  if (processKey) {
    return processKey;
  }

  const envPath = path.resolve(process.cwd(), '.env.content');
  if (!fs.existsSync(envPath)) {
    throw new Error(
      'Missing OPENAI_API_KEY. Set it in shell or create .env.content from .env.content.example (script-only, not client-exposed).',
    );
  }

  const envText = fs.readFileSync(envPath, 'utf8');
  const parsed = parseDotEnv(envText);
  const fileKey = parsed.OPENAI_API_KEY?.trim();

  if (!fileKey) {
    throw new Error('OPENAI_API_KEY not found in .env.content.');
  }

  return fileKey;
}
