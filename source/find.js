import Commander from 'commander';

import {traverse, filter} from './core';


Commander
    .arguments('[dir]')
    .option('-r, --reg-exp <pattern>',  'RegExp to filter')
    .option('-c, --count <number>',  'Result count')
    .parse( process.argv );


(async () => {

    for await (let file of filter(
        traverse(Commander.args[0] || '.'),
        Commander.regExp,
        Commander.count
    ))
        console.info( file );
})();
