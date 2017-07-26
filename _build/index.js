'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Dialog = require('./Dialog');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Modal2.default.alert = _Dialog.alert;
_Modal2.default.confirm = _Dialog.confirm;
_Modal2.default.prompt = _Dialog.prompt;
_Modal2.default.toast = _Dialog.toast;

exports.default = _Modal2.default;