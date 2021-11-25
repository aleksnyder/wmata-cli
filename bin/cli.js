#!/usr/bin/env node

import src from '../src/index.js';
import dist from '../dist/index.js';

if (process.env.NODE_ENV === 'development') {
  src;
} else {
  dist;
}
