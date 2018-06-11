import 'babel-polyfill';

import {readdir, stat, execSync} from 'fs-extra';

import {join} from 'path';

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
 * @param {function}         [callback]       Call with every result
 */
export  async function filter(iterator, pattern, count, callback) {

    var index = 0;  count = ~~count || Infinity;

    if (pattern  &&  (! (pattern instanceof RegExp)))
        pattern = RegExp(pattern + '',  'i');

    callback = (callback instanceof Function)  &&  callback;

    for await (let item of iterator)
        if ((! pattern)  ||  pattern.test( item ))
            if (index++ < count)
                callback  &&  callback(item, index);
            else
                break;
}


/**
 * @param {string} name - Name (without extension name) of a executable file
 *
 * @return {string} First matched path of a command
 */
export  async function which(name) {

    var path;

    const setPath = file => path = file;

    switch ( process.platform ) {
        case 'win32':  {

            for (let root of getAppFolder()) {

                await filter(
                    traverse( root ),  `\\\\${name}\\.exe$`,  1,  setPath
                );

                if ( path )  return path;
            }

            break;
        }
        case 'darwin':  {

            for (let root of [
                '/Volumes', '/Applications', `${process.env.HOME}/Applications`
            ]) {
                await filter(traverse( root ),  `${name}.app$`,  1,  setPath);

                if ( path )  return path;
            }

            break;
        }
        default:
            path = execSync(`which ${name}`) + '';
    }

    return path;
}
