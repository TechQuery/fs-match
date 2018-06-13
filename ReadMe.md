# FS match

A NodeJS package for finding folders, files & apps by Regular expression based on [Asynchronous iteration of ES 9](https://babeljs.io/docs/plugins/transform-async-generator-functions/).

[![NPM Dependency](https://david-dm.org/TechQuery/fs-match.svg)](https://david-dm.org/TechQuery/fs-match)

[![NPM](https://nodei.co/npm/fs-match.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/fs-match/)



## Use in another module

 - Example
   1. [find](source/find.js)
   2. [which](source/which.js)
 - Document
   - Online: [URL](https://techquery.github.io/fs-match/) or `npm docs`
   - Offline: `npm start`



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

# Append to a file

app-find chrome firefox -f .npmrc

# Set up NPM configuration

app-find chrome firefox -c
```


## Typical case

 1. [Puppeteer browser](https://easywebapp.github.io/puppeteer-browser)
