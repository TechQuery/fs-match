import { readdir, stat, existsSync } from 'fs-extra';
import { join } from 'path';
import { execSync } from 'child_process';

import { getPartition, getAppFolder } from './windows';

const { platform, env } = process;

/**
 * Traverse File-system
 *
 * @param path - Root path to traverse
 */
export async function* traverse(path: string): AsyncGenerator<string> {
    if (path === '/' && platform === 'win32') {
        for (const disk of getPartition()) yield* traverse(disk);

        return;
    }

    for (let name of await readdir(path)) {
        name = join(path, name);

        yield name;

        try {
            if ((await stat(name)).isDirectory()) yield* traverse(name);
        } catch (error) {
            switch (error.code) {
                case 'ENOENT':
                case 'EPERM':
                case 'EBUSY':
                case 'ELOOP':
                case 'UNKNOWN':
                    continue;
            }

            throw error;
        }
    }
}

/**
 * Iterator filter
 *
 * @param iterator
 * @param pattern  String pattern to match
 * @param count    Result count
 */
export async function* filter(
    iterator: AsyncIterable<string>,
    pattern?: RegExp | string,
    count = Infinity
) {
    let index = 0;
    count = ~~count || Infinity;

    if (pattern && !(pattern instanceof RegExp))
        pattern = RegExp(pattern + '', 'i');

    for await (const item of iterator)
        if (!pattern || (pattern as RegExp).test(item))
            if (index++ < count) yield item;
            else break;
}

function Shell_which(name: string) {
    try {
        return (execSync(`which ${name}`) + '').trim();
    } catch (error) {
        if (!('' + error.stdout + error.stderr).trim()) return '';
    }
}

const MacAppPath = ['/Applications', `${env.HOME}/Applications`].filter(
    existsSync
);

/**
 * @param name - Name (without extension name) of a executable file
 *
 * @return First matched path of a command
 */
export async function which(name: string): Promise<string> {
    switch (platform) {
        case 'win32':
            for (const root of getAppFolder())
                for await (const file of filter(
                    traverse(root),
                    `\\\\${name}\\.exe$`,
                    1
                ))
                    return file;
            break;
        case 'darwin': {
            const path = Shell_which(name);

            if (path) return path;

            for (const root of MacAppPath)
                for await (const file of filter(
                    traverse(root),
                    `\\.app\\/Contents\\/MacOS\\/(\\w+\\W)?${name}$`,
                    1
                ))
                    return file;
            break;
        }
        default: {
            const path = Shell_which(name);

            if (path) return path;

            for await (const file of filter(traverse('/opt'), `${name}$`, 1))
                return file;
        }
    }

    return '';
}
