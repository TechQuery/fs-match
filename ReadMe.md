# FS match

A NodeJS package for finding files or folders by Regular expression based on built-in command of your OS.

[![NPM Dependency](https://david-dm.org/TechQuery/fs-match.svg)](https://david-dm.org/TechQuery/fs-match)

[![NPM](https://nodei.co/npm/fs-match.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/fs-match/)



## Usage


### Import to other module

[Example](command.js)


### Use in command-line shell

```Shell
# Search the whole File system

fs-match "full\\.name\\.pattern"

# Search in a folder

fs-match "full\\.name\\.pattern" "root/path"
```


## Dependency

 - Windows: [PowerShell](https://microsoft.com/powershell)
