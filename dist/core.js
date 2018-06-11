'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.which = exports.filter = exports.traverse = undefined;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncGeneratorDelegate2 = require('babel-runtime/helpers/asyncGeneratorDelegate');

var _asyncGeneratorDelegate3 = _interopRequireDefault(_asyncGeneratorDelegate2);

/**
 * Traverse File-system
 *
 * @param {string} path - Root path to traverse
 */
var traverse = exports.traverse = function () {
    var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, disk, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, name;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(path === '/' && process.platform === 'win32')) {
                            _context.next = 27;
                            break;
                        }

                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 4;
                        _iterator = (0, _getIterator3.default)((0, _windows.getPartition)());

                    case 6:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 12;
                            break;
                        }

                        disk = _step.value;
                        return _context.delegateYield((0, _asyncGeneratorDelegate3.default)((0, _asyncIterator3.default)(traverse(disk)), _asyncGenerator3.default.await), 't0', 9);

                    case 9:
                        _iteratorNormalCompletion = true;
                        _context.next = 6;
                        break;

                    case 12:
                        _context.next = 18;
                        break;

                    case 14:
                        _context.prev = 14;
                        _context.t1 = _context['catch'](4);
                        _didIteratorError = true;
                        _iteratorError = _context.t1;

                    case 18:
                        _context.prev = 18;
                        _context.prev = 19;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 21:
                        _context.prev = 21;

                        if (!_didIteratorError) {
                            _context.next = 24;
                            break;
                        }

                        throw _iteratorError;

                    case 24:
                        return _context.finish(21);

                    case 25:
                        return _context.finish(18);

                    case 26:
                        return _context.abrupt('return');

                    case 27:
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context.prev = 30;
                        _context.t2 = _getIterator3.default;
                        _context.next = 34;
                        return _asyncGenerator3.default.await((0, _fsExtra.readdir)(path));

                    case 34:
                        _context.t3 = _context.sent;
                        _iterator2 = (0, _context.t2)(_context.t3);

                    case 36:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context.next = 58;
                            break;
                        }

                        name = _step2.value;


                        name = (0, _path.join)(path, name);

                        _context.next = 41;
                        return name;

                    case 41:
                        _context.prev = 41;
                        _context.next = 44;
                        return _asyncGenerator3.default.await((0, _fsExtra.stat)(name));

                    case 44:
                        if (!_context.sent.isDirectory()) {
                            _context.next = 46;
                            break;
                        }

                        return _context.delegateYield((0, _asyncGeneratorDelegate3.default)((0, _asyncIterator3.default)(traverse(name)), _asyncGenerator3.default.await), 't4', 46);

                    case 46:
                        _context.next = 55;
                        break;

                    case 48:
                        _context.prev = 48;
                        _context.t5 = _context['catch'](41);
                        _context.t6 = _context.t5.code;
                        _context.next = _context.t6 === 'EPERM' ? 53 : _context.t6 === 'EBUSY' ? 53 : _context.t6 === 'UNKNOWN' ? 53 : 54;
                        break;

                    case 53:
                        return _context.abrupt('continue', 55);

                    case 54:
                        throw _context.t5;

                    case 55:
                        _iteratorNormalCompletion2 = true;
                        _context.next = 36;
                        break;

                    case 58:
                        _context.next = 64;
                        break;

                    case 60:
                        _context.prev = 60;
                        _context.t7 = _context['catch'](30);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context.t7;

                    case 64:
                        _context.prev = 64;
                        _context.prev = 65;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 67:
                        _context.prev = 67;

                        if (!_didIteratorError2) {
                            _context.next = 70;
                            break;
                        }

                        throw _iteratorError2;

                    case 70:
                        return _context.finish(67);

                    case 71:
                        return _context.finish(64);

                    case 72:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 14, 18, 26], [19,, 21, 25], [30, 60, 64, 72], [41, 48], [65,, 67, 71]]);
    }));

    return function traverse(_x) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Iterator filter
 *
 * @param {Iterable}         iterator
 * @param {?(RegExp|string)} pattern          String pattern to match
 * @param {number}           [count=Infinity] Result count
 * @param {function}         [callback]       Call with every result
 */


var filter = exports.filter = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(iterator, pattern, count, callback) {
        var index, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _value, item;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        index = 0;
                        count = ~~count || Infinity;

                        if (pattern && !(pattern instanceof RegExp)) pattern = RegExp(pattern + '', 'i');

                        callback = callback instanceof Function && callback;

                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context2.prev = 7;
                        _iterator3 = (0, _asyncIterator3.default)(iterator);

                    case 9:
                        _context2.next = 11;
                        return _iterator3.next();

                    case 11:
                        _step3 = _context2.sent;
                        _iteratorNormalCompletion3 = _step3.done;
                        _context2.next = 15;
                        return _step3.value;

                    case 15:
                        _value = _context2.sent;

                        if (_iteratorNormalCompletion3) {
                            _context2.next = 27;
                            break;
                        }

                        item = _value;

                        if (!(!pattern || pattern.test(item))) {
                            _context2.next = 24;
                            break;
                        }

                        if (!(index++ < count)) {
                            _context2.next = 23;
                            break;
                        }

                        callback && callback(item, index);
                        _context2.next = 24;
                        break;

                    case 23:
                        return _context2.abrupt('break', 27);

                    case 24:
                        _iteratorNormalCompletion3 = true;
                        _context2.next = 9;
                        break;

                    case 27:
                        _context2.next = 33;
                        break;

                    case 29:
                        _context2.prev = 29;
                        _context2.t0 = _context2['catch'](7);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context2.t0;

                    case 33:
                        _context2.prev = 33;
                        _context2.prev = 34;

                        if (!(!_iteratorNormalCompletion3 && _iterator3.return)) {
                            _context2.next = 38;
                            break;
                        }

                        _context2.next = 38;
                        return _iterator3.return();

                    case 38:
                        _context2.prev = 38;

                        if (!_didIteratorError3) {
                            _context2.next = 41;
                            break;
                        }

                        throw _iteratorError3;

                    case 41:
                        return _context2.finish(38);

                    case 42:
                        return _context2.finish(33);

                    case 43:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[7, 29, 33, 43], [34,, 38, 42]]);
    }));

    return function filter(_x2, _x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * @param {string} name - Name (without extension name) of a executable file
 *
 * @return {string} First matched path of a command
 */


var which = exports.which = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(name) {
        var path, setPath, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, root, _arr, _i, _root;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        setPath = function setPath(file) {
                            return path = file;
                        };

                        _context3.t0 = process.platform;
                        _context3.next = _context3.t0 === 'win32' ? 4 : _context3.t0 === 'darwin' ? 33 : 45;
                        break;

                    case 4:
                        _iteratorNormalCompletion4 = true;
                        _didIteratorError4 = false;
                        _iteratorError4 = undefined;
                        _context3.prev = 7;
                        _iterator4 = (0, _getIterator3.default)((0, _windows.getAppFolder)());

                    case 9:
                        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                            _context3.next = 18;
                            break;
                        }

                        root = _step4.value;
                        _context3.next = 13;
                        return filter(traverse(root), '\\\\' + name + '\\.exe$', 1, setPath);

                    case 13:
                        if (!path) {
                            _context3.next = 15;
                            break;
                        }

                        return _context3.abrupt('return', path);

                    case 15:
                        _iteratorNormalCompletion4 = true;
                        _context3.next = 9;
                        break;

                    case 18:
                        _context3.next = 24;
                        break;

                    case 20:
                        _context3.prev = 20;
                        _context3.t1 = _context3['catch'](7);
                        _didIteratorError4 = true;
                        _iteratorError4 = _context3.t1;

                    case 24:
                        _context3.prev = 24;
                        _context3.prev = 25;

                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }

                    case 27:
                        _context3.prev = 27;

                        if (!_didIteratorError4) {
                            _context3.next = 30;
                            break;
                        }

                        throw _iteratorError4;

                    case 30:
                        return _context3.finish(27);

                    case 31:
                        return _context3.finish(24);

                    case 32:
                        return _context3.abrupt('break', 46);

                    case 33:
                        _arr = ['/Volumes', '/Applications', process.env.HOME + '/Applications'];
                        _i = 0;

                    case 35:
                        if (!(_i < _arr.length)) {
                            _context3.next = 44;
                            break;
                        }

                        _root = _arr[_i];
                        _context3.next = 39;
                        return filter(traverse(_root), name + '.app$', 1, setPath);

                    case 39:
                        if (!path) {
                            _context3.next = 41;
                            break;
                        }

                        return _context3.abrupt('return', path);

                    case 41:
                        _i++;
                        _context3.next = 35;
                        break;

                    case 44:
                        return _context3.abrupt('break', 46);

                    case 45:
                        path = (0, _fsExtra.execSync)('which ' + name) + '';

                    case 46:
                        return _context3.abrupt('return', path);

                    case 47:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[7, 20, 24, 32], [25,, 27, 31]]);
    }));

    return function which(_x6) {
        return _ref3.apply(this, arguments);
    };
}();

require('babel-polyfill');

var _fsExtra = require('fs-extra');

var _path = require('path');

var _windows = require('./windows');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }