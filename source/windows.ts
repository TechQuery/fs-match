import {existsSync, readdirSync} from 'fs';

const { env } = process;


var disk;
/**
 * @return  Acessible disk partitions of current Windows
 */
export  function getPartition(): string[] {

    return  disk  ||  (disk = 'CDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(disk => {

        disk = `${disk}:\\`;

        if (existsSync( disk )  &&  readdirSync( disk )[2])  return disk;

    }).filter( Boolean ));
}


var folder;
/**
 * @return  Acessible application folders of current Windows
 */
export  function getAppFolder(): string[] {

    return  folder  ||  (folder = getPartition().map(disk =>
        [env.PROGRAMFILES, env['ProgramFiles(x86)'], env.LOCALAPPDATA].filter(
            path => existsSync(path = disk + path.slice(3))
        )
    ).flat());
}
