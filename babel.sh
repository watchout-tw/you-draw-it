#!/bin/bash
npm install babel-plugin-transform-es2015-destructuring
babel --plugins transform-es2015-destructuring src/graph.js --out-file build/graph.js
