import 'babel-polyfill';

import {readdir, stat, existsSync} from 'fs-extra';

import {join} from 'path';

import {execSync} from 'child_process';

import {getPartition, getAppFolder} from './windows';


/**
 * Traverse File-system
 *
 * @param {string} path - Root path to traverse
 */
export  async function* traverse(path) {

    if ((path === '/')  &&  (process.platform === 'win32')) {

        for (let disk of getPartition())  yield* traverse( disk );

        return;
    }

    for (let name  of  await readdir( path )) {

        name = join(path, name);

        yield name;

        try {
            if ((await stat( name )).isDirectory())
                yield* traverse( name );

        } catch (error) {

            switch ( error.code ) {
                case 'EPERM':
                case 'EBUSY':
                case 'ELOOP':
                case 'UNKNOWN':    continue;
            }

            throw error;
        }
    }
}

/**
 * Iterator filter
 *
 * @param {Iterable}         iterator
 * @param {?(RegExp|string)} pattern          String pattern to match
 * @param {number}           [count=Infinity] Result count
 */
export  async function* filter(iterator, pattern, count) {

    var index = 0;  count = ~~count || Infinity;

    if (pattern  &&  (! (pattern instanceof RegExp)))
        pattern = RegExp(pattern + '',  'i');

    for await (let item of iterator)
        if ((! pattern)  ||  pattern.test( item ))
            if (index++ < count)
                yield item;
            else
                break;
}


function Shell_which(name) {

    return  (execSync(`which ${name}`) + '').trim();
}

const MacAppPath = [
    '/Applications', `${process.env.HOME}/Applications`
].filter( existsSync );


/**
 * @param {string} name - Name (without extension name) of a executable file
 *
 * @return {string} First matched path of a command
 */
export  async function which(name) {

    switch ( process.platform ) {
        case 'win32':
            for (let root of getAppFolder())
                for await (let file of filter(
                    traverse( root ),  `\\\\${name}\\.exe$`,  1
                ))
                    return file;
            break;
        case 'darwin':  {

            let path = Shell_which( name );

            if ( path )  return path;

            for (let root of MacAppPath)
                for await (let file of filter(
                    traverse( root ),  `${name}.app$`,  1)
                )
                    return file;
            break;
        }
        default:
            return  Shell_which( name );
    }

    return '';
}
