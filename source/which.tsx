#! /usr/bin/env node

import { Command, createCommand } from 'commander-jsx';
import { appendFileSync } from 'fs';
import { execSync } from 'child_process';

import { which } from './core';

async function match(
    { 'ini-file': iniFile, 'NPM-config': NPMConfig },
    ...list: string[]
) {
    const show_log = iniFile || NPMConfig;

    if (show_log) console.time('Search');

    for (const name of list) {
        const path = await which(name);

        console.info((show_log || list[1] ? `${name}=` : '') + path);

        if (iniFile) appendFileSync(iniFile, `${name}=${path}\n`);
        else if (NPMConfig) execSync(`npm set ${name} ${JSON.stringify(path)}`);
    }

    if (!show_log) return;

    console.info('--------------------');
    console.timeEnd('Search');
}

Command.execute(
    <Command
        name="fs-match"
        parameters="[name ...]"
        version="1.4.0"
        description="Search App paths with App Name"
        options={{
            'ini-file': {
                shortcut: 'f',
                parameters: '<path>',
                description: 'Append result to an ini-like file'
            },
            'NPM-config': {
                shortcut: 'c',
                description: 'Set result to local NPM configuration'
            }
        }}
        executor={match}
    />,
    process.argv.slice(2)
);
