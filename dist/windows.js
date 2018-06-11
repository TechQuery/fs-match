'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.getPartition = getPartition;
exports.getAppFolder = getAppFolder;

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Env = process.env;

var disk;
/**
 * @return {string[]} Acessible disk partitions of current Windows
 */
function getPartition() {

    return disk || (disk = 'CDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function (disk) {

        disk = disk + ':\\';

        if ((0, _fs.existsSync)(disk) && (0, _fs.readdirSync)(disk)[2]) return disk;
    }).filter(Boolean));
}

var folder;
/**
 * @return {string[]} Acessible application folders of current Windows
 */
function getAppFolder() {
    var _ref;

    return folder || (folder = (_ref = []).concat.apply(_ref, (0, _toConsumableArray3.default)(getPartition().map(function (disk) {

        var list = [];

        var _arr = [Env.PROGRAMFILES, Env['ProgramFiles(x86)'], Env.LOCALAPPDATA];
        for (var _i = 0; _i < _arr.length; _i++) {
            var path = _arr[_i];
            if ((0, _fs.existsSync)(path = disk + path.slice(3))) list.push(path);
        }return list;
    }))));
}