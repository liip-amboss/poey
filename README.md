poey
====

upload upload to poe, download from poe

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/poey.svg)](https://npmjs.org/package/poey)
[![Downloads/week](https://img.shields.io/npm/dw/poey.svg)](https://npmjs.org/package/poey)
[![License](https://img.shields.io/npm/l/poey.svg)](https://github.com/translationCli/poey/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g poey
add poe.ini file to directory and save your API key inside of it.
Don't forget to add the .ini to your .gitignore
$ poey COMMAND
running command...
$ poey (-v|--version|version)
poey/1.0.0 darwin-x64 node-v10.15.3
$ poey --help [COMMAND]
USAGE
  $ poey COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`poey help [COMMAND]`](#poey-help-command)
* [`poey pull`](#poey-pull)
* [`poey push`](#poey-push)

## `poey help [COMMAND]`

display help for poey

```
USAGE
  $ poey help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `poey pull`

pull exports from poe

```
USAGE
  $ poey pull

OPTIONS
  -i, --id=id      project id
  -p, --path=path  target folder
  -t, --type=type  filetype to export

DESCRIPTION
  ...
  Download exports from poeditor.com and save them as files straight to your project
```

_See code: [src/commands/pull.js](https://github.com/translationCli/poey/blob/v1.0.0/src/commands/pull.js)_

## `poey push`

Push a json to poe

```
USAGE
  $ poey push

OPTIONS
  -i, --id=id      project id
  -l, --lang=lang  language code
  -p, --path=path  path to json

DESCRIPTION
  ...
  Uploads a file and its contents to poeditor and adds both keys of the file to the terms and translations of the file
  to the active translation, it does NOT overwrite existing translations!
  All flags are required.
```

_See code: [src/commands/push.js](https://github.com/translationCli/poey/blob/v1.0.0/src/commands/push.js)_
<!-- commandsstop -->
