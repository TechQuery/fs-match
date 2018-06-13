import {traverse, filter, which} from '../source/core';

import {statSync, readFileSync, unlinkSync, existsSync} from 'fs';

import {isAbsolute} from 'path';

import {getPartition, getAppFolder} from '../source/windows';

import {release} from 'os';

import { execSync } from 'child_process';


const directory = [
        'docs/ast',
        'docs/ast/source',
        'docs/css',
        'docs/file',
        'docs/file/source',
        'docs/function',
        'docs/image',
        'docs/script',
        'docs/script/prettify',
        'docs/test-file',
        'docs/test-file/test'
    ],
    NodeExe = `node${(process.platform === 'win32')  ?  '.exe'  :  ''}`;


describe('Core methods',  () => {
    /**
     * @test {traverse}
     */
    it('Traverse directory tree',  async () => {

        const folder = [ ];

        for await (let name of traverse('./docs'))
            if (statSync( name ).isDirectory())
                folder.push( name.replace(/\\/g, '/') );

        folder.should.be.eql( directory );
    });


    describe('Iterator filter',  () => {
        /**
         * @test {filter}
         */
        it('By pattern',  async () => {

            const folder = [ ];

            for await (let name of filter(
                traverse('./docs'), /(\\|\/)[^\\/.]+$/
            ))
                folder.push( name.replace(/\\/g, '/') );

            folder.should.be.eql( directory );
        });

        /**
         * @test {filter}
         */
        it('By count',  async () => {

            const folder = [ ];

            for await (let name  of  filter(traverse('./docs'), null, 2))
                folder.push( name.replace(/\\/g, '/') );

            folder.should.be.eql( directory.slice(0, 2) );
        });

        /**
         * @test {filter}
         */
        it('By pattern & count',  async () => {

            const folder = [ ];

            for await (let name of filter(
                traverse('./docs'), /(\\|\/)[^\\/.]+$/, 3
            ))
                folder.push( name.replace(/\\/g, '/') );

            folder.should.be.eql( directory.slice(0, 3) );
        });
    });

    /**
     * @test {which}
     */
    it('Search application executable',  async () => {

        const path = await which('node');

        isAbsolute( path ).should.be.true();

        path.should.be.endWith( NodeExe );
    });
});


describe('Windows dedicated',  () => {

    if (process.platform !== 'win32')  return;

    /**
     * @test {getPartition}
     */
    it(
        'Find all existing disk partitions',
        () => getPartition().should.be.containEql('C:\\')
    );

    /**
     * @test {getAppFolder}
     */
    it('Get possible paths of application installation',  () => {

        const path = getAppFolder();

        path.should.be.containEql('C:\\Program Files');

        if (parseInt( release() ) > 5)
            path.should.matchAny( /C:\\Users\\.+?\\AppData\\Local/ );
    });
});


describe('`which` command',  () => {

    const command = 'node dist/which node';


    it('Write to `stdout`',  () => {

        const path = (execSync( command ) + '').trim();

        isAbsolute( path ).should.be.true();

        path.should.be.endWith( NodeExe );

        existsSync( path ).should.be.true();
    });


    it('Write to a file',  () => {

        const log = execSync(`${command} -f test/example.ini`) + '';

        log.should.match( /node=[\s\S]+?node[\s\S]+-+\nSearch: \d+(\.\d+)?ms/ );

        (readFileSync('test/example.ini') + '').trim().should.be.equal(
            log.split('\n')[0]
        );
    });


    it('Write to NPM configuration',  () => {

        const log = execSync(`${command} -c`) + '';

        (execSync('npm get node') + '').trim().should.be.equal(
            log.split( /=|\n/ )[1]
        );
    });


    after(() => {

        unlinkSync('test/example.ini');

        execSync('npm config delete node');
    });
});
