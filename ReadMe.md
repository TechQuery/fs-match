# FS match

A NodeJS package for finding folders, files & apps by Regular expression based on [Asynchronous iteration of ES 9][1] & TypeScript.

[![NPM Dependency](https://david-dm.org/TechQuery/fs-match.svg)][2]
[![CI & CD](https://github.com/TechQuery/fs-match/actions/workflows/main.yml/badge.svg)][3]

[![NPM](https://nodei.co/npm/fs-match.png?downloads=true&downloadRank=true&stars=true)][4]

## Use in another module

-   Example
    1. [find](source/find.tsx)
    2. [which](source/which.tsx)
-   Document
    -   Online: [URL][5] or `npm docs`
    -   Offline: `npm start`

## Use in Command-line shell

### Search files

```Shell
# Search in current directory

fs-match -r full\.name\.pattern

# Search in a specific folder

fs-match root/path -r full\.name\.pattern

# Search first match in a specific folder

fs-match root/path -r full\.name\.pattern -c 1
```

### Search apps

```Shell
# Show in stdout

app-find chrome firefox

# Append result to an ini-like file

app-find chrome firefox -f .npmrc

# Append result to ".env" file in working directory (since npm@9 & fs-match@1.7)

app-find chrome firefox -c
```

## Typical case

1.  [Puppeteer browser](https://web-cell.dev/puppeteer-browser/)
2.  [Hexo migrator for Web](https://tech-query.me/hexo-migrator-web/)

[1]: https://javascript.info/async-iterators-generators
[2]: https://david-dm.org/TechQuery/fs-match
[3]: https://github.com/TechQuery/fs-match/actions/workflows/main.yml
[4]: https://nodei.co/npm/fs-match/
[5]: https://tech-query.me/fs-match/
