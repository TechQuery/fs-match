#! /usr/bin/env node

const {
    readdirSync, readFileSync, outputFileSync, appendFileSync
} = require('fs-extra');

const {join} = require('path'), {transform} = require('babel-core');


const option = {
        presets:  ['env'],
        plugins:  [
            'transform-async-generator-functions',
            'transform-runtime'
        ],
        ast:      false
    },
    source = process.argv[2], target = process.argv[3];

console.time('Compile');

for (let file  of  readdirSync( source )) {

    let content = readFileSync( join(source, file) )  +  '';

    let code = transform(content, option).code;  file = join(target, file);

    if ((! /^export /m.test( content ))  &&  /\Wprocess\.argv/.test( content )) {

        outputFileSync(file,  '#! /usr/bin/env node\n\n');

        appendFileSync(file, code);
    } else
        outputFileSync(file, code);

    console.info(`[ Compiled ]  ${file}`);
}

console.info('--------------------');

console.timeEnd('Compile');
