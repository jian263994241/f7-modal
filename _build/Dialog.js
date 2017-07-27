'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alert = alert;
exports.confirm = confirm;
exports.prompt = prompt;
exports.toast = toast;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _rcMounter = require('rc-mounter');

var _rcMounter2 = _interopRequireDefault(_rcMounter);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modalLock = false;

var modalStack = [];

var modalStackClearQueue = function modalStackClearQueue() {
  modalLock = false;
  if (modalStack.length) {
    modalStack.shift()();
  }
};

var addQueue = function addQueue(fn) {
  if (modalLock) {
    modalStack.push(fn);
    return true;
  }
};

function alert(parmas) {

  if (addQueue(alert.bind(this, parmas))) return true;

  var title = parmas.title,
      text = parmas.text,
      onOk = parmas.onOk,
      _parmas$okText = parmas.okText,
      okText = _parmas$okText === undefined ? '确定' : _parmas$okText;


  var clickOk = function clickOk() {
    mounted.updateProps({ visible: false }, onOk);
  };

  modalLock = true;

  var mounted = _rcMounter2.default.mount(_react2.default.createElement(
    _Modal2.default,
    {
      visible: true,
      closeByOutside: false,
      afterClose: afterClose,
      fixTop: true,
      mounter: true
    },
    _react2.default.createElement(
      'div',
      { className: _styles2.default['modal-inner'] },
      _react2.default.createElement(
        'div',
        { className: _styles2.default['modal-title'] },
        title
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default['modal-text'] },
        text
      )
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default['modal-buttons'] },
      _react2.default.createElement(
        'span',
        { className: _styles2.default['modal-button'] + ' ' + _styles2.default['modal-button-bold'], onClick: clickOk },
        okText
      )
    )
  ));

  function afterClose() {
    mounted.getComponent().getMounter().destroy();
    modalStackClearQueue();
  }
};

function confirm(parmas) {

  if (addQueue(confirm.bind(this, parmas))) return true;

  var title = parmas.title,
      text = parmas.text,
      onOk = parmas.onOk,
      onCancel = parmas.onCancel,
      _parmas$okText2 = parmas.okText,
      okText = _parmas$okText2 === undefined ? '确定' : _parmas$okText2,
      _parmas$cancelText = parmas.cancelText,
      cancelText = _parmas$cancelText === undefined ? '取消' : _parmas$cancelText;


  var clickOk = function clickOk() {
    mounted.updateProps({ visible: false }, onOk);
  };

  var clickCancel = function clickCancel() {
    mounted.updateProps({ visible: false }, onCancel);
  };

  modalLock = true;

  var mounted = _rcMounter2.default.mount(_react2.default.createElement(
    _Modal2.default,
    {
      visible: true,
      closeByOutside: false,
      afterClose: afterClose,
      fixTop: true,
      mounter: true
    },
    _react2.default.createElement(
      'div',
      { className: _styles2.default['modal-inner'] },
      _react2.default.createElement(
        'div',
        { className: _styles2.default['modal-title'] },
        title
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default['modal-text'] },
        text
      )
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default['modal-buttons'] },
      _react2.default.createElement(
        'span',
        { className: '' + _styles2.default['modal-button'], onClick: clickCancel },
        cancelText
      ),
      _react2.default.createElement(
        'span',
        { className: _styles2.default['modal-button'] + ' ' + _styles2.default['modal-button-bold'], onClick: clickOk },
        okText
      )
    )
  ));

  function afterClose() {
    mounted.getComponent().getMounter().destroy();
    modalStackClearQueue();
  }
};

function prompt(parmas) {
  var _this = this;

  if (addQueue(prompt.bind(this, arguments))) return true;

  var title = parmas.title,
      text = parmas.text,
      onOk = parmas.onOk,
      onCancel = parmas.onCancel,
      _parmas$okText3 = parmas.okText,
      okText = _parmas$okText3 === undefined ? '确定' : _parmas$okText3,
      _parmas$cancelText2 = parmas.cancelText,
      cancelText = _parmas$cancelText2 === undefined ? '取消' : _parmas$cancelText2;


  var value = null;

  var inputField = function inputField(e) {
    value = e.target.value;
  };

  var clickOk = function clickOk() {
    mounted.updateProps({ visible: false }, onOk.bind(_this, value));
  };

  var clickCancel = function clickCancel() {
    mounted.updateProps({ visible: false }, onCancel);
  };

  modalLock = true;

  var mounted = _rcMounter2.default.mount(_react2.default.createElement(
    _Modal2.default,
    {
      visible: true,
      closeByOutside: false,
      afterClose: afterClose,
      fixTop: true,
      mounter: true
    },
    _react2.default.createElement(
      'div',
      { className: _styles2.default['modal-inner'] },
      _react2.default.createElement(
        'div',
        { className: _styles2.default['modal-title'] },
        title
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default['modal-text'] },
        text
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default['input-field'] },
        _react2.default.createElement('input', { type: 'text', className: _styles2.default['modal-text-input'], onChange: inputField })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default['modal-buttons'] },
      _react2.default.createElement(
        'span',
        { className: _styles2.default['modal-button'], onClick: clickCancel },
        cancelText
      ),
      _react2.default.createElement(
        'span',
        { className: _styles2.default['modal-button'] + ' ' + _styles2.default['modal-button-bold'], onClick: clickOk },
        okText
      )
    )
  ));

  function afterClose() {
    mounted.getComponent().getMounter().destroy();
    modalStackClearQueue();
  }
}

function toast(text, timer, callbackOk) {
  if (typeof timer === 'function' || typeof timer === 'undefined') {
    callbackOk = arguments[1];
    timer = 1500;
  }

  if (addQueue(toast.bind(this, arguments))) return true;

  var onCancel = function onCancel() {
    mounted.updateProps({ visible: false }, callbackOk);
  };

  setTimeout(onCancel, timer);

  modalLock = true;

  var mounted = _rcMounter2.default.mount(_react2.default.createElement(
    _Modal2.default,
    {
      type: 'toast',
      visible: true,
      closeByOutside: true,
      onCancel: onCancel,
      afterClose: afterClose,
      fixTop: true,
      mounter: true
    },
    _react2.default.createElement(
      'div',
      { className: _styles2.default['modal-inner'] },
      _react2.default.createElement(
        'div',
        { className: _styles2.default['modal-text'] },
        text
      )
    )
  ));

  function afterClose() {
    mounted.getComponent().getMounter().destroy();
    modalStackClearQueue();
  }
}