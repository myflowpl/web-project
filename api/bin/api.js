#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

// Get the directory where the package is installed
const packageDir = path.resolve(__dirname, '..');

// Check if we're running from installed package or local development
const isGlobalInstall = !fs.existsSync(path.join(packageDir, 'package.json'));
const appPath = isGlobalInstall 
  ? path.join(__dirname, '..', 'app.js')
  : path.join(__dirname, '..', 'app.js');

// Display startup message
console.log('🚀 Starting Mock API Server...');
console.log('📦 Package directory:', packageDir);

// Set working directory to current directory (where user runs the command)
process.chdir(process.cwd());

// Require and start the app
try {
  require(appPath);
} catch (error) {
  console.error('❌ Failed to start Mock API Server:');
  console.error(error.message);
  console.error('\nTroubleshooting:');
  console.error('1. Make sure you have Node.js 16+ installed');
  console.error('2. Try reinstalling: npm uninstall -g @myflowpl/api-server && npm install -g @myflowpl/api-server');
  console.error('3. Check permissions if on macOS/Linux');
  process.exit(1);
}