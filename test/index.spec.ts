import { statSync, readFileSync, unlinkSync, existsSync } from 'fs';
import { isAbsolute } from 'path';
import { release } from 'os';
import { execSync } from 'child_process';

import { traverse, filter, which } from '../source/core';
import { getPartition, getAppFolder } from '../source/windows';

const paths = ['docs/.nojekyll', 'docs/assets', 'docs/modules'],
    NodeExe = 'node' + (process.platform === 'win32' ? '.exe' : '');

describe('Core methods', () => {
    /**
     * @test {traverse}
     */
    it('Traverse directory tree', async () => {
        const folder = [];

        for await (const name of traverse('./docs'))
            if (statSync(name).isDirectory())
                folder.push(name.replace(/\\/g, '/'));

        expect(folder).toEqual(paths.slice(1));
    });

    describe('Iterator filter', () => {
        /**
         * @test {filter}
         */
        it('By pattern', async () => {
            const folder = [];

            for await (const name of filter(
                traverse('./docs'),
                /(\\|\/)[^\\/.]+$/
            ))
                folder.push(name.replace(/\\/g, '/'));

            expect(folder).toEqual(paths.slice(1));
        });

        /**
         * @test {filter}
         */
        it('By count', async () => {
            const folder = [];

            for await (const name of filter(traverse('./docs'), null, 2))
                folder.push(name.replace(/\\/g, '/'));

            expect(folder).toEqual(paths.slice(0, 2));
        });

        /**
         * @test {filter}
         */
        it('By pattern & count', async () => {
            const folder = [];

            for await (const name of filter(
                traverse('./docs'),
                /(\\|\/)[^\\/.]+$/,
                3
            ))
                folder.push(name.replace(/\\/g, '/'));

            expect(folder).toEqual(paths.slice(1));
        });
    });

    /**
     * @test {which}
     */
    it('Search application executable', async () => {
        const path = await which('node');

        expect(isAbsolute(path)).toBe(true);

        expect(path.endsWith(NodeExe)).toBe(true);
    });
});

describe('Windows dedicated', () => {
    if (process.platform !== 'win32') return;

    /**
     * @test {getPartition}
     */
    it('Find all existing disk partitions', () =>
        expect(getPartition()).toContainEqual('C:\\'));

    /**
     * @test {getAppFolder}
     */
    it('Get possible paths of application installation', () => {
        const path = getAppFolder();

        expect(path).toContainEqual('C:\\Program Files');

        if (parseInt(release()) > 5)
            expect(
                path.find(item => /C:\\Users\\.+?\\AppData\\Local/.test(item))
            ).toBeTruthy();
    });
});

describe('`which` command', () => {
    const command = 'node dist/which node';

    it('Write to `stdout`', () => {
        const path = (execSync(command) + '').trim();

        expect(isAbsolute(path)).toBe(true);

        expect(path.endsWith(NodeExe)).toBe(true);

        expect(existsSync(path)).toBe(true);
    });

    it('Write to a file', () => {
        const log = execSync(`${command} -f test/example.ini`) + '';

        expect(log).toMatch(
            /node=[\s\S]+?node[\s\S]+-+\nSearch: \d+(\.\d+)?m?s/
        );

        expect((readFileSync('test/example.ini') + '').trim()).toBe(
            log.split('\n')[0]
        );
    });

    it('Write to NPM configuration', () => {
        const log = execSync(`${command} -c`) + '';

        expect((execSync('npm get node') + '').trim()).toBe(
            log.split(/=|\n/)[1]
        );
    });

    if (process.platform !== 'win32')
        it('Find nothing with only empty output', () =>
            expect((execSync(`${command}_unknown`) + '').trim()).toBe(''));

    afterAll(() => {
        unlinkSync('test/example.ini');

        execSync('npm config delete node');
    });
});
