'use strict';

const FS = require('fs'), child_process = require('child_process');



function mapDisk(filter) {

    return  'CDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(disk => {

        disk = `${disk}:\\`;

        if (FS.existsSync( disk )  &&  FS.readdirSync( disk )[2])
            return  filter( disk );

    }).filter( Boolean );
}


function output(result) {

    const error = result.stderr.toString('utf-8')
        .replace(/.+(Permission denied|not permitted)/mg, '')
        .replace(/(\n|\r|\r\n){2,}/, '').trim();

    if ( error )  console.warn( error );

    return result.stdout.toString('utf-8').trim();
}


const match = (process.platform === 'win32')  ?
    function match(path, name) {

        if (path !== '"/"')  try {

            return child_process.execSync(
                `cmd /C "dir ${path} /S /B  |  findstr /R /I ${name}"`,
                {encoding: 'utf-8'}
            );
        } catch (error) {

            if ( error.message.indexOf('Command failed') )  throw error;

            return '';
        }

        return  mapDisk(disk => match(disk, name)).join("\n");
    } :
    function (path, name) {

        if (name.indexOf('.*') < 0)  name = `.*${name}.*`;

        return output(child_process.spawnSync(
            'find',  [path, '-type', 'dfl', '-iregex', `.*/${name}`]
        ));
    };


module.exports = function (name_pattern,  root_path = '/') {

    return match(
        JSON.stringify( root_path ),  JSON.stringify( name_pattern )
    ).split( /[\r\n]+/ );
};
