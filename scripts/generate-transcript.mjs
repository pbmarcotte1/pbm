#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { getOpenAIApiKey } from './lib/get-openai-api-key.mjs';

const [, , inputArg, outputArg] = process.argv;

if (!inputArg) {
  console.error('Usage: node scripts/generate-transcript.mjs <input.{mp3|mp4|wav|m4a}> [output.txt]');
  process.exit(1);
}

const inputPath = path.resolve(process.cwd(), inputArg);
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

const defaultOutput = path.resolve(
  process.cwd(),
  'public/media/transcripts',
  `${path.basename(inputPath, ext)}.txt`,
);
const outputPath = outputArg ? path.resolve(process.cwd(), outputArg) : defaultOutput;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const buffer = fs.readFileSync(inputPath);
const fileBlob = new Blob([buffer], { type: 'application/octet-stream' });

const form = new FormData();
form.append('file', fileBlob, path.basename(inputPath));
form.append('model', 'whisper-1');
form.append('response_format', 'text');

const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
  body: form,
});

if (!response.ok) {
  const errorText = await response.text();
  console.error(`Transcription failed (${response.status}): ${errorText}`);
  process.exit(1);
}

const transcriptText = await response.text();
fs.writeFileSync(outputPath, transcriptText, 'utf8');

console.log(`Transcript saved to ${outputPath}`);
console.log('Use this in a work example:');
console.log(`transcriptFileUrl: '/media/transcripts/${path.basename(outputPath)}'`);
