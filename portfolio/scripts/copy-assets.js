import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
fs.mkdirSync(publicDir, { recursive: true });

// Look for resume.pdf
const candidates = [
  path.resolve(__dirname, '../../resume.pdf'),
  path.resolve('/Users/mohi/Documents/Personal-Projects/noor-mohideen-resume/resume.pdf'),
  path.resolve('/Users/mohi/Documents/Personal-Projects/noor-mohideen-portfolio/resume.pdf')
];

for (const candidate of candidates) {
  try {
    if (fs.existsSync(candidate)) {
      fs.copyFileSync(candidate, path.join(publicDir, 'resume.pdf'));
      console.log(`[Asset Copier] Copied resume.pdf from ${candidate} to public/resume.pdf`);
      break;
    }
  } catch (err) {
    // continue
  }
}
