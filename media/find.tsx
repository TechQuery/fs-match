#! /usr/bin/env node

import { Command, createCommand } from 'commander-jsx';

import { traverse, filter } from './core';

async function find({ 'reg-exp': regExp, count }, folder = process.cwd()) {
    for await (const file of filter(traverse(folder), regExp, count))
        console.info(file);
}

Command.execute(
    <Command
        parameters="[dir]"
        description="Search File paths with Regular Expression"
        options={{
            'reg-exp': {
                shortcut: 'r',
                parameters: '<pattern>',
                description: 'RegExp to filter'
            },
            count: {
                shortcut: 'c',
                parameters: '<number>',
                description: 'Result count'
            }
        }}
        executor={find}
    />,
    process.argv.slice(2)
);
