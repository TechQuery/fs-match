import 'babel-polyfill';

import {existsSync, readdirSync, readdir, stat, execSync} from 'fs-extra';

import {join} from 'path';


var disk;

export  function WinDisk() {

    return  disk  ||  (disk = 'CDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(disk => {

        disk = `${disk}:\\`;

        if (existsSync( disk )  &&  readdirSync( disk )[2])  return disk;

    }).filter( Boolean ));
}


export  async function* traverse(path) {

    if ((path === '/')  &&  (process.platform === 'win32')) {

        for (let disk of WinDisk())  yield* traverse( disk );

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


export  async function which(name) {

    var path;

    const setPath = file => path = file;

    switch ( process.platform ) {
        case 'win32':  {

            for (let root of [
                process.env.PROGRAMFILES, process.env['ProgramFiles(x86)']
            ]) {
                if (! root)  continue;

                await filter(
                    traverse( root ),  `\\\\${name}\\.exe$`,  1,  setPath
                );

                if ( path )  return path;
            }

            break;
        }
        case 'darwin':
            await filter(traverse('/Application'), `\\\\${name}$`, 1, setPath);
            break;
        default:
            path = execSync(`which ${name}`) + '';
    }

    return path;
}
