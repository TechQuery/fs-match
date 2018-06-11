import {existsSync, readdirSync} from 'fs';

const Env = process.env;


var disk;
/**
 * @return {string[]} Acessible disk partitions of current Windows
 */
export  function getPartition() {

    return  disk  ||  (disk = 'CDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(disk => {

        disk = `${disk}:\\`;

        if (existsSync( disk )  &&  readdirSync( disk )[2])  return disk;

    }).filter( Boolean ));
}


var folder;
/**
 * @return {string[]} Acessible application folders of current Windows
 */
export  function getAppFolder() {

    return  folder  ||  (folder = [ ].concat(... getPartition().map(disk => {

        const list = [ ];

        for (let path of [
            Env.PROGRAMFILES, Env['ProgramFiles(x86)'], Env.LOCALAPPDATA
        ])
            if (existsSync(path = disk + path.slice(3)))  list.push( path );

        return list;
    })));
}
