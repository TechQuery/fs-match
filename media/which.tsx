#! /usr/bin/env node

import { saveEnv } from '@tech_query/node-toolkit';
import { Command } from 'commander-jsx';
import { parse } from 'path';

import { which } from './core';

async function match(
    { 'max-count': maxCount, 'ini-file': iniFile, 'NPM-config': NPMConfig },
    ...list: string[]
) {
    const show_log = iniFile || NPMConfig;
    let count = 0;

    if (show_log) console.time('Search');

    for await (const path of which(...list)) {
        const name = list.find(name => parse(path).base.startsWith(name)) || '';

        console.info(
            show_log || list[1] ? `${name}=${JSON.stringify(path)}` : path
        );
        if (iniFile || NPMConfig)
            await saveEnv({ [name]: path }, iniFile || '.env');

        if (++count >= +maxCount) break;
    }

    if (show_log) {
        console.info('--------------------');
        console.timeEnd('Search');
    }
    process.exit();
}

Command.execute(
    <Command
        parameters="[name ...]"
        description="Search App paths with App Name"
        options={{
            'max-count': {
                shortcut: 'm',
                parameters: '<number>',
                description: 'Limit the number of results'
            },
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
