'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionsModal = exports.PickerModal = exports.Popover = exports.Popup = exports.Modal = undefined;

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _PickerModal = require('./PickerModal');

var _PickerModal2 = _interopRequireDefault(_PickerModal);

var _ActionsModal = require('./ActionsModal');

var _ActionsModal2 = _interopRequireDefault(_ActionsModal);

var _Dialog = require('./Dialog');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Modal2.default.alert = _Dialog.alert;
_Modal2.default.confirm = _Dialog.confirm;
_Modal2.default.prompt = _Dialog.prompt;
_Modal2.default.toast = _Dialog.toast;

exports.Modal = _Modal2.default;
exports.Popup = _Popup2.default;
exports.Popover = _Popover2.default;
exports.PickerModal = _PickerModal2.default;
exports.ActionsModal = _ActionsModal2.default;