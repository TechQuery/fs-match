#! /usr/bin/env node

const search = require('./index'),
      pattern = process.argv[2],
      root = process.argv[3] || '/';

var list = search(pattern, root);

if ( list[0] )
    console.log( list.join("\n") );
else
    console.warn(`Files in "${root}" don't match "${pattern}".`);
