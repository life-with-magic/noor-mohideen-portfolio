import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const base = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : './';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-resume-assets',
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist');

        if (fs.existsSync(distDir)) {
          // Copy resume.yaml to dist
          try {
            const yamlSrc = path.resolve(__dirname, 'src/data/resume.yaml');
            if (fs.existsSync(yamlSrc)) {
              fs.copyFileSync(yamlSrc, path.join(distDir, 'resume.yaml'));
            }
          } catch (e) {
            // Ignore if permission denied
          }

          // Copy resume.pdf if available locally in public or root
          try {
            const localPdf = path.resolve(__dirname, 'public/resume.pdf');
            if (fs.existsSync(localPdf)) {
              fs.copyFileSync(localPdf, path.join(distDir, 'resume.pdf'));
            }
          } catch (e) {
            // Ignore if not present
          }
        }
      }
    }
  ],
  base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
