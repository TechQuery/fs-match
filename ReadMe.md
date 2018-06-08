# FS match

A NodeJS package for finding files or folders by Regular expression based on [Asynchronous iteration of ES 9](https://babeljs.io/docs/plugins/transform-async-generator-functions/)

[![NPM Dependency](https://david-dm.org/TechQuery/fs-match.svg)](https://david-dm.org/TechQuery/fs-match)

[![NPM](https://nodei.co/npm/fs-match.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/fs-match/)



## Usage


### Import to other module

[Example](source/command.js)


### Use in command-line shell

```Shell
# Search in current directory

fs-match -r full\.name\.pattern

# Search in a specific folder

fs-match root/path -r full\.name\.pattern

# Search first match in a specific folder

fs-match root/path -r full\.name\.pattern -c 1
```
