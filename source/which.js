import {which} from './core';

import {appendFileSync} from 'fs';

const write_file = process.argv[3];


(async () => {

    if (write_file)  console.time('Search');

    for (let name of process.argv[2].split(',')) {

        let path = await which( name );

        console.info((write_file  ?  '[ Found ]  '  :  '')  +  path);

        if (write_file)  appendFileSync(write_file,  `${name}=${path}\n`);
    }

    if (! write_file)  return;

    console.info('--------------------');

    console.timeEnd('Search');
})();
