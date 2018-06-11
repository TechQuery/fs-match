#! /usr/bin/env node

'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _core = require('./core');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var write_file = process.argv[3];

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, name, path;

    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:

                    if (write_file) console.time('Search');

                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 4;
                    _iterator = (0, _getIterator3.default)(process.argv[2].split(','));

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


                    console.info((write_file ? '[ Found ]  ' : '') + path);

                    if (write_file) (0, _fs.appendFileSync)(write_file, name + '=' + path + '\n');

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
                    if (write_file) {
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