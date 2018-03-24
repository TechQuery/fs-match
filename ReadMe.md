# Find file

A NodeJS package for searching files or folders by Regular expression based on built-in command of your OS.

[![NPM Dependency](https://david-dm.org/TechQuery/search-file.svg)](https://david-dm.org/TechQuery/search-file)

[![NPM](https://nodei.co/npm/search-file.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/search-file/)



## Usage


### Import to other module

[Example](command.js)


### Use in command-line shell

```Shell
# Search the whole File system

search-file "full\\.name\\.pattern"

# Search in a folder

search-file "full\\.name\\.pattern" "root/path"
```


## Dependency

 - Windows: [PowerShell](https://microsoft.com/powershell)
