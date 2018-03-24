#! /usr/bin/env node

const FS_match = require('./index'),
      pattern = process.argv[2],
      root = process.argv[3] || '/';

var list = FS_match(pattern, root);

if ( list[0] )
    console.log( list.join("\n") );
else
    console.warn(`Files in "${root}" don't match "${pattern}".`);
