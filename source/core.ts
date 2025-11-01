import { execSync } from 'child_process';
import { existsSync, readdir, statSync } from 'fs-extra';
import { join } from 'path';

import { getAppFolder, getPartition } from './windows';

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

    for (const node of await readdir(path, { withFileTypes: true })) {
        const fullPath = join(path, node.name);
        yield fullPath;

        try {
            if (node.isDirectory()) yield* traverse(fullPath);
        } catch (error) {
            switch (error.code) {
                case 'ENOENT':
                case 'EPERM':
                case 'EACCES':
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

function $which(name: string) {
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
 * @param names - Names (without extension name) of Executable files
 */
export async function* which(...names: string[]) {
    const appRoots =
            platform === 'win32'
                ? getAppFolder()
                : platform === 'darwin'
                  ? MacAppPath
                  : ['/opt'],
        appPatterns =
            platform === 'win32'
                ? names.map(name => RegExp(String.raw`\\${name}\.exe$`, 'i'))
                : platform === 'darwin'
                  ? names.map(name =>
                        RegExp(
                            String.raw`\.app/Contents/MacOS/(\w+\W)?${name}$`,
                            'i'
                        )
                    )
                  : names.map(name => RegExp(`/${name}$`, 'i')),
        noPathCommandPatterns: RegExp[] = [];

    if (platform === 'win32') noPathCommandPatterns.push(...appPatterns);
    else
        for (const [index, name] of Object.entries(names)) {
            const path = $which(name);

            if (path) yield path;
            else noPathCommandPatterns.push(appPatterns[index]);
        }

    for (const root of appRoots)
        for await (const file of traverse(root)) {
            if (!noPathCommandPatterns[0]) return;

            const index = noPathCommandPatterns.findIndex(pattern =>
                pattern.test(file)
            );
            if (index < 0 || !statSync(file).isFile()) continue;

            noPathCommandPatterns.splice(index, 1);

            yield file;
        }
}
