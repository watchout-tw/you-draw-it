#!/bin/bash
npm install babel-plugin-transform-es2015-destructuring
npm install babel-plugin-transform-es2015-template-literals
npm install babel-plugin-transform-object-assign
npm install babel-plugin-transform-es2015-arrow-functions
babel --plugins=transform-es2015-destructuring,transform-es2015-template-literals,transform-object-assign,transform-es2015-arrow-functions src/graph.js --out-file build/graph.js
babel --plugins=transform-es2015-destructuring,transform-es2015-template-literals,transform-object-assign,transform-es2015-arrow-functions tsai-first-year/src/app.js --out-file tsai-first-year/build/app.js
