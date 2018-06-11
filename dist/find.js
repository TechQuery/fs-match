#! /usr/bin/env node

'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.arguments('[dir]').option('-r, --reg-exp <pattern>', 'RegExp to filter').option('-c, --count <number>', 'Result count').parse(process.argv);

(0, _core.filter)((0, _core.traverse)(_commander2.default.args[0] || '.'), _commander2.default.regExp, _commander2.default.count, function (file) {
    return console.info(file);
});