#!/usr/bin/env node
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const candidates = [
  path.resolve(__dirname, '..', 'node_modules', 'jest', 'bin', 'jest.js'),
  path.resolve(__dirname, '..', '..', 'node_modules', 'jest', 'bin', 'jest.js')
];

const jestBin = candidates.find((candidate) => {
  try {
    return require('node:fs').existsSync(candidate);
  } catch {
    return false;
  }
});

if (!jestBin) {
  console.error(
    "No se encontró Jest en node_modules. Ejecutá 'npm install' en la raíz del repo y reintentá."
  );
  process.exit(1);
}

const args = [jestBin, '--config', path.resolve(__dirname, '..', 'jest.config.cjs'), ...process.argv.slice(2)];
const result = spawnSync(process.execPath, args, { stdio: 'inherit' });

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
