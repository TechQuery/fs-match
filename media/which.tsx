#! /usr/bin/env node

import { Command, createCommand } from 'commander-jsx';
import { appendFileSync } from 'fs';

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

        if (iniFile || NPMConfig)
            appendFileSync(iniFile || '.env', `${name}=${path}\n`);
    }

    if (!show_log) return;

    console.info('--------------------');
    console.timeEnd('Search');
}

Command.execute(
    <Command
        parameters="[name ...]"
        description="Search App paths with App Name"
        options={{
            'ini-file': {
                shortcut: 'f',
                parameters: '<path>',
                description: 'Append result to an ini-like file'
            },
            'NPM-config': {
                shortcut: 'c',
                description:
                    'Append result to ".env" file in working directory (since npm@9 & fs-match@1.7)'
            }
        }}
        executor={match}
    />,
    process.argv.slice(2)
);
