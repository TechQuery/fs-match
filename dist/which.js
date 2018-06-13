#! /usr/bin/env node

'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _core = require('./core');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fs = require('fs');

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.arguments('[name ...]').option('-f, --ini-file <path>', 'Append result to an ini-like file').option('-c, --NPM-config', 'Set result to local NPM configuration').parse(process.argv);

var show_log = _commander2.default.iniFile || _commander2.default.NPMConfig;

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, name, path;

    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:

                    if (show_log) console.time('Search');

                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 4;
                    _iterator = (0, _getIterator3.default)(_commander2.default.args);

                case 6:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context.next = 16;
                        break;
                    }

                    name = _step.value;
                    _context.next = 10;
                    return (0, _core.which)(name);

                case 10:
                    path = _context.sent;


                    console.info((show_log || _commander2.default.args[1] ? name + '=' : '') + path);

                    if (_commander2.default.iniFile) (0, _fs.appendFileSync)(_commander2.default.iniFile, name + '=' + path + '\n');else if (_commander2.default.NPMConfig) (0, _child_process.execSync)('npm set ' + name + ' ' + (0, _stringify2.default)(path));

                case 13:
                    _iteratorNormalCompletion = true;
                    _context.next = 6;
                    break;

                case 16:
                    _context.next = 22;
                    break;

                case 18:
                    _context.prev = 18;
                    _context.t0 = _context['catch'](4);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                case 22:
                    _context.prev = 22;
                    _context.prev = 23;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 25:
                    _context.prev = 25;

                    if (!_didIteratorError) {
                        _context.next = 28;
                        break;
                    }

                    throw _iteratorError;

                case 28:
                    return _context.finish(25);

                case 29:
                    return _context.finish(22);

                case 30:
                    if (show_log) {
                        _context.next = 32;
                        break;
                    }

                    return _context.abrupt('return');

                case 32:

                    console.info('--------------------');

                    console.timeEnd('Search');

                case 34:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined, [[4, 18, 22, 30], [23,, 25, 29]]);
}))();