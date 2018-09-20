#! /usr/bin/env node

import '@babel/polyfill';

import {packageOf, currentModulePath} from '@tech_query/node-toolkit';

import Commander from 'commander';

import {which} from './core';

import {appendFileSync} from 'fs';

import {execSync} from 'child_process';


const meta = packageOf( currentModulePath() ).meta;

Commander
    .version( meta.version )
    .description( meta.description )
    .arguments('[name ...]')
    .option('-f, --ini-file <path>',  'Append result to an ini-like file')
    .option('-c, --NPM-config',  'Set result to local NPM configuration')
    .parse( process.argv );

const show_log = Commander.iniFile || Commander.NPMConfig;


(async () => {

    if (show_log)  console.time('Search');

    for (let name of Commander.args) {

        let path = await which( name );

        console.info(
            ((show_log || Commander.args[1])  ?  `${name}=`  :  '')  +  path
        );

        if ( Commander.iniFile )
            appendFileSync(Commander.iniFile,  `${name}=${path}\n`);
        else if ( Commander.NPMConfig )
            execSync(`npm set ${name} ${JSON.stringify( path )}`);
    }

    if (! show_log)  return;

    console.info('--------------------');

    console.timeEnd('Search');
})();
