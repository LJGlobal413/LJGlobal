import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const buildDir = path.resolve('build');

if (fs.existsSync(distDir)) {
  try {
    fs.cpSync(distDir, buildDir, { recursive: true, force: true });
    console.log('✓ Post-build: Output directory synchronized to both dist/ and build/');
  } catch (err) {
    console.warn('Post-build sync warning:', err);
  }
}
