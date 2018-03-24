'use strict';

const FS = require('fs'), child_process = require('child_process');



const match = (process.platform === 'win32')  ?
    function match(path, name) {

        if (path === '/')
            return  'CDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function (disk) {

                disk = `${disk}:\\`;

                return  FS.existsSync( disk )  &&  match(disk, name);

            }).filter( Boolean ).join("\n");

        var output = child_process.execSync(
                `powershell -command "(Get-ChildItem '${
                    path
                }' -Force -Recurse -ErrorAction SilentlyContinue).FullName -imatch '${
                    name
                }'"`
            ).toString('utf-8').trim();

        return  (output === 'False')  ?  ''  :  output;
    } :
    function (path, name) {

        var result = child_process.spawnSync(
                'find',  [path, '-iregex', `.*/${name}`]
            );

        console.warn(
            result.stderr.toString('utf-8')
                .replace(/.+Permission denied/mg, '').trim()
        );

        return result.stdout.toString('utf-8').trim();
    };


module.exports = function (name_pattern,  root_path = '/') {

    return  match(root_path, name_pattern).split("\n");
};
