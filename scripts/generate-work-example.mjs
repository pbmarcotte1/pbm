#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { getOpenAIApiKey } from './lib/get-openai-api-key.mjs';

const args = process.argv.slice(2);
const inputArg = args[0];
const slugArg = args[1];

if (!inputArg) {
  console.error('Usage: node scripts/generate-work-example.mjs <input.{mp3|mp4|wav|m4a}> [slug]');
  process.exit(1);
}

const root = process.cwd();
const inputPath = path.resolve(root, inputArg);
if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const ext = path.extname(inputPath).toLowerCase();
const allowed = new Set(['.mp3', '.mp4', '.wav', '.m4a']);
if (!allowed.has(ext)) {
  console.error(`Unsupported file type: ${ext}. Use mp3, mp4, wav, or m4a.`);
  process.exit(1);
}

let apiKey;
try {
  apiKey = getOpenAIApiKey();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const baseName = path.basename(inputPath, ext);
const toSlug = (value) =>
  value
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
const slug = toSlug(slugArg || baseName);

const transcriptOutputPath = path.join(root, 'public', 'media', 'transcripts', `${slug}.txt`);
const moduleOutputPath = path.join(root, 'src', 'content', 'workExamples', `${slug}.ts`);
const indexPath = path.join(root, 'src', 'content', 'workExamples', 'index.ts');

fs.mkdirSync(path.dirname(transcriptOutputPath), { recursive: true });
fs.mkdirSync(path.dirname(moduleOutputPath), { recursive: true });

const mediaRelative = path.relative(path.join(root, 'public'), inputPath).replace(/\\/g, '/');
const mediaUrl = mediaRelative.startsWith('..') ? `/media/${path.basename(inputPath)}` : `/${mediaRelative}`;
const transcriptFileUrl = `/media/transcripts/${slug}.txt`;

const mediaBytes = fs.readFileSync(inputPath);
const mediaBlob = new Blob([mediaBytes], { type: 'application/octet-stream' });

const transcribeForm = new FormData();
transcribeForm.append('file', mediaBlob, path.basename(inputPath));
transcribeForm.append('model', 'whisper-1');
transcribeForm.append('response_format', 'text');

const transcriptResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
  body: transcribeForm,
});

if (!transcriptResponse.ok) {
  const errorText = await transcriptResponse.text();
  console.error(`Transcription failed (${transcriptResponse.status}): ${errorText}`);
  process.exit(1);
}

const transcriptText = (await transcriptResponse.text()).trim();
fs.writeFileSync(transcriptOutputPath, `${transcriptText}\n`, 'utf8');

const summaryResponse = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          'You convert transcript text into concise website work-example content. Return strict JSON with keys: title, description, transcript, insights, applications. transcript should be an array of 2-4 short paragraphs. insights should be 3 bullets. applications should be 2 bullets. Keep language plainspoken, direct, no buzzwords.',
      },
      {
        role: 'user',
        content: transcriptText,
      },
    ],
  }),
});

if (!summaryResponse.ok) {
  const errorText = await summaryResponse.text();
  console.error(`Summary generation failed (${summaryResponse.status}): ${errorText}`);
  process.exit(1);
}

const summaryJson = await summaryResponse.json();
const messageContent = summaryJson?.choices?.[0]?.message?.content;
if (!messageContent) {
  console.error('No summary content returned from model.');
  process.exit(1);
}

let parsed;
try {
  parsed = JSON.parse(messageContent);
} catch {
  console.error('Failed to parse model JSON output.');
  process.exit(1);
}

const toArray = (value, fallback = []) =>
  Array.isArray(value) ? value.filter((item) => typeof item === 'string' && item.trim()) : fallback;

const title = typeof parsed.title === 'string' && parsed.title.trim() ? parsed.title.trim() : baseName;
const description =
  typeof parsed.description === 'string' && parsed.description.trim()
    ? parsed.description.trim()
    : 'Generated from media content. Edit this text as needed.';
const transcript = toArray(parsed.transcript, transcriptText.split(/\n\s*\n/).filter(Boolean).slice(0, 3));
const insights = toArray(parsed.insights, ['replace with key observation 1', 'replace with key observation 2', 'replace with key observation 3']);
const applications = toArray(parsed.applications, ['replace with situation 1', 'replace with situation 2']);

const escape = (value) => value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const lines = (items) => items.map((item) => `    '${escape(item)}',`).join('\n');

const mediaLine = ext === '.mp4' ? `  videoUrl: '${mediaUrl}',` : `  audioUrl: '${mediaUrl}',`;
const moduleVarName = `${slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Module`;

const moduleContent = `export const ${moduleVarName} = {\n  id: '${slug}',\n  enabled: false,\n  title: '${escape(title)}',\n  description:\n    '${escape(description)}',\n${mediaLine}\n  transcriptFileUrl: '${transcriptFileUrl}',\n  transcript: [\n${lines(transcript)}\n  ],\n  insights: [\n${lines(insights)}\n  ],\n  applications: [\n${lines(applications)}\n  ],\n};\n`;

fs.writeFileSync(moduleOutputPath, moduleContent, 'utf8');

const importLine = `import { ${moduleVarName} } from './${slug}';`;
const indexContent = fs.readFileSync(indexPath, 'utf8');
let updatedIndex = indexContent;

if (!updatedIndex.includes(importLine)) {
  const importInsertPoint = updatedIndex.indexOf('\n\nexport type');
  if (importInsertPoint !== -1) {
    updatedIndex = `${updatedIndex.slice(0, importInsertPoint)}\n${importLine}${updatedIndex.slice(importInsertPoint)}`;
  }
}

if (!updatedIndex.includes(`${moduleVarName},`)) {
  updatedIndex = updatedIndex.replace(/export const workExamples:\s*WorkExampleContent\[]\s*=\s*\[([\s\S]*?)\];/, (match, group) => {
    const trimmed = group.trimEnd();
    const withComma = trimmed.endsWith(',') || trimmed.length === 0 ? trimmed : `${trimmed},`;
    return `export const workExamples: WorkExampleContent[] = [\n${withComma}\n  ${moduleVarName},\n];`;
  });
}

fs.writeFileSync(indexPath, updatedIndex, 'utf8');

console.log(`Transcript: ${transcriptOutputPath}`);
console.log(`Work example file: ${moduleOutputPath}`);
console.log('Generated with enabled: false so you can edit before publishing.');
