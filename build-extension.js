#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Building extension...');

try {
  // Build the project
  execSync('bun run build', { stdio: 'inherit' });
  
  // Copy manifest.json to dist
  fs.copyFileSync('manifest.json', 'dist/manifest.json');
  
  console.log('✅ Extension built successfully!');
  console.log('📁 Extension files are in the dist/ directory');
  console.log('');
  console.log('🚀 To load the extension in Chrome:');
  console.log('1. Open Chrome and go to chrome://extensions/');
  console.log('2. Enable "Developer mode"');
  console.log('3. Click "Load unpacked"');
  console.log('4. Select the dist/ folder');
  console.log('');
  console.log('📝 The extension will appear in your browser toolbar and side panel');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
