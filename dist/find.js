#! /usr/bin/env node

'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.arguments('[dir]').option('-r, --reg-exp <pattern>', 'RegExp to filter').option('-c, --count <number>', 'Result count').parse(process.argv);

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, file;

    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 3;
                    _iterator = (0, _asyncIterator3.default)((0, _core.filter)((0, _core.traverse)(_commander2.default.args[0] || '.'), _commander2.default.regExp, _commander2.default.count));

                case 5:
                    _context.next = 7;
                    return _iterator.next();

                case 7:
                    _step = _context.sent;
                    _iteratorNormalCompletion = _step.done;
                    _context.next = 11;
                    return _step.value;

                case 11:
                    _value = _context.sent;

                    if (_iteratorNormalCompletion) {
                        _context.next = 18;
                        break;
                    }

                    file = _value;

                    console.info(file);

                case 15:
                    _iteratorNormalCompletion = true;
                    _context.next = 5;
                    break;

                case 18:
                    _context.next = 24;
                    break;

                case 20:
                    _context.prev = 20;
                    _context.t0 = _context['catch'](3);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                case 24:
                    _context.prev = 24;
                    _context.prev = 25;

                    if (!(!_iteratorNormalCompletion && _iterator.return)) {
                        _context.next = 29;
                        break;
                    }

                    _context.next = 29;
                    return _iterator.return();

                case 29:
                    _context.prev = 29;

                    if (!_didIteratorError) {
                        _context.next = 32;
                        break;
                    }

                    throw _iteratorError;

                case 32:
                    return _context.finish(29);

                case 33:
                    return _context.finish(24);

                case 34:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined, [[3, 20, 24, 34], [25,, 29, 33]]);
}))();