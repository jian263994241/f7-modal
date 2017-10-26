'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionsModal = exports.PickerModal = exports.Popup = exports.Modal = undefined;

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _PickerModal = require('./PickerModal');

var _PickerModal2 = _interopRequireDefault(_PickerModal);

var _ActionsModal = require('./ActionsModal');

var _ActionsModal2 = _interopRequireDefault(_ActionsModal);

var _Dialog = require('./Dialog');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Modal2.default.alert = _Dialog.alert;
// import Popover from './Popover'

_Modal2.default.confirm = _Dialog.confirm;
_Modal2.default.prompt = _Dialog.prompt;
_Modal2.default.toast = _Dialog.toast;

var f7Modal = { Modal: _Modal2.default, Popup: _Popup2.default, PickerModal: _PickerModal2.default, ActionsModal: _ActionsModal2.default };

exports.default = f7Modal;
exports.Modal = _Modal2.default;
exports.Popup = _Popup2.default;
exports.PickerModal = _PickerModal2.default;
exports.ActionsModal = _ActionsModal2.default;