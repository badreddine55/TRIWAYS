import { cp, mkdir } from 'node:fs/promises';

// Next's standalone output needs public and static assets copied alongside server.js.
await mkdir('.next/standalone/.next', { recursive: true });
await cp('public', '.next/standalone/public', { recursive: true });
await cp('.next/static', '.next/standalone/.next/static', { recursive: true });
console.log('Standalone package ready in .next/standalone');
