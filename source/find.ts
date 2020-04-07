#! /usr/bin/env node

import Commander from 'commander';

import {traverse, filter} from './core';


Commander
    .version('1.4.0')
    .description('Search File paths with Regular Expression')
    .arguments('[dir]')
    .option('-r, --reg-exp <pattern>',  'RegExp to filter')
    .option('-c, --count <number>',  'Result count')
    .parse( process.argv );


(async () => {

    for await (const file of filter(
        traverse(Commander.args[0] || '.'),
        Commander.regExp,
        Commander.count
    ))
        console.info( file );
})();
