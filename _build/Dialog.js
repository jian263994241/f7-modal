'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.alert = alert;
exports.confirm = confirm;
exports.prompt = prompt;
exports.toast = toast;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

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

function renderModal(config) {

  if (addQueue(renderModal.bind(this, config))) return true;

  modalLock = true;

  var props = (0, _extends3.default)({
    type: 'modal'
  }, config);

  var div = document.createElement('div');
  document.body.appendChild(div);

  var timeoutFn = null,
      Dialog = null;

  function close() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (0, _reactDom.render)((0, _react.cloneElement)(Dialog, {
      visible: false,
      afterClose: function afterClose() {
        var unmountResult = (0, _reactDom.unmountComponentAtNode)(div);
        if (unmountResult && div.parentNode) {
          div.parentNode.removeChild(div);
        }
        if (props.onCancel) {
          props.onCancel.apply(props, args);
        }
        clearTimeout(timeoutFn);
        modalStackClearQueue();
      }
    }), div);
  }

  var maskClosable = props.maskClosable === undefined ? false : props.maskClosable;

  var ActionButton = function ActionButton(_ref) {
    var _classnames;

    var children = _ref.children,
        bold = _ref.bold,
        action = _ref.action,
        closeModal = _ref.closeModal;

    var btnCss = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, _styles2.default['modal-button'], true), (0, _defineProperty3.default)(_classnames, _styles2.default['modal-button-bold'], bold), _classnames));
    var onClick = function onClick() {
      action && action();
      closeModal && closeModal();
    };
    return _react2.default.createElement(
      'span',
      { className: btnCss, onClick: onClick },
      children
    );
  };

  Dialog = _react2.default.createElement(
    _Modal2.default,
    {
      visible: true,
      fixTop: true,
      closeByOutside: maskClosable,
      onCancel: close,
      mounter: false,
      type: props.type
    },
    _react2.default.createElement(
      'div',
      { className: _styles2.default['modal-inner'] },
      props.title && _react2.default.createElement(
        'div',
        { className: _styles2.default['modal-title'] },
        props.title
      ),
      props.text && _react2.default.createElement(
        'div',
        { className: _styles2.default['modal-text'] },
        props.text
      ),
      props.textAfter
    ),
    props.buttons && _react2.default.createElement(
      'div',
      { className: _styles2.default['modal-buttons'] },
      props.buttons.map(function (item, index) {
        return _react2.default.createElement(
          ActionButton,
          { action: item.click, closeModal: close, key: index },
          item.text
        );
      })
    )
  );

  (0, _reactDom.render)(Dialog, div);

  if (props.type === 'toast' && props.timeout > 0) {
    timeoutFn = setTimeout(close, props.timeout);
  }

  return {
    destroy: close
  };
}

function alert(parmas) {
  var title = parmas.title,
      text = parmas.text,
      onOk = parmas.onOk,
      _parmas$okText = parmas.okText,
      okText = _parmas$okText === undefined ? '确定' : _parmas$okText;


  renderModal({
    title: title, text: text,
    buttons: [{ click: onOk, text: okText }]
  });
};

function confirm(parmas) {
  var title = parmas.title,
      text = parmas.text,
      onOk = parmas.onOk,
      onCancel = parmas.onCancel,
      _parmas$okText2 = parmas.okText,
      okText = _parmas$okText2 === undefined ? '确定' : _parmas$okText2,
      _parmas$cancelText = parmas.cancelText,
      cancelText = _parmas$cancelText === undefined ? '取消' : _parmas$cancelText;


  renderModal({
    title: title, text: text,
    buttons: [{ click: onCancel, text: cancelText }, { click: onOk, text: okText }]
  });
};

function prompt(parmas) {
  var title = parmas.title,
      text = parmas.text,
      onOk = parmas.onOk,
      onCancel = parmas.onCancel,
      _parmas$okText3 = parmas.okText,
      okText = _parmas$okText3 === undefined ? '确定' : _parmas$okText3,
      _parmas$cancelText2 = parmas.cancelText,
      cancelText = _parmas$cancelText2 === undefined ? '取消' : _parmas$cancelText2;


  var target = {};

  var inputField = function inputField(e) {
    target.value = e.target.value;
    target.input = e.target;
  };

  var input = _react2.default.createElement(
    'div',
    { className: _styles2.default['input-field'] },
    _react2.default.createElement('input', { type: 'text', className: _styles2.default['modal-text-input'], onChange: inputField })
  );

  renderModal({
    title: title, text: text,
    textAfter: input,
    buttons: [{ click: onCancel, text: cancelText }, { click: onOk.bind(this, target), text: okText }]
  });
}

function toast(text, timer, callbackOk) {

  // if( addQueue( toast.bind(this, text, timer, callbackOk) ) ) return true;

  if (Object.prototype.toString.call(text) === '[object Object]') {
    var _arguments$ = arguments[0],
        title = _arguments$.title,
        text = _arguments$.text,
        timer = _arguments$.timer,
        callbackOk = _arguments$.callbackOk,
        closeByOutside = _arguments$.closeByOutside;
  } else {

    var title = null,
        closeByOutside = true;

    if (typeof timer === 'function') {
      callbackOk = arguments[1];
      timer = 2000;
    }
  }

  timer = timer != undefined ? timer : 2000;

  renderModal({
    title: title, text: text,
    type: 'toast',
    maskClosable: !!timer,
    onCancel: callbackOk,
    timeout: timer
  });
}

toast.sucess = function (text, timer, callbackOk) {
  if (typeof timer === 'function') {
    callbackOk = arguments[1];
    timer = 2000;
  }

  var title = _react2.default.createElement(
    'svg',
    { width: '32', height: '32', viewBox: '0 0 16 16', xmlns: 'http://www.w3.org/2000/svg' },
    _react2.default.createElement(
      'g',
      { stroke: '#FFF', strokeWidth: '.5', fill: 'none', fillRule: 'evenodd' },
      _react2.default.createElement('circle', { cx: '8', cy: '8', r: '7.75' }),
      _react2.default.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M4.047 8.25l2.565 2.65 4.95-4.99' })
    )
  );
  toast({ text: text, title: title, timer: timer, callbackOk: callbackOk });
};

toast.fail = function (text, timer, callbackOk) {
  if (typeof timer === 'function') {
    callbackOk = arguments[1];
    timer = 2000;
  }
  var title = _react2.default.createElement(
    'svg',
    { width: '32', height: '32', viewBox: '0 0 16 16', xmlns: 'http://www.w3.org/2000/svg' },
    _react2.default.createElement(
      'g',
      { strokeWidth: '.5', stroke: '#FFF', fill: 'none', fillRule: 'evenodd' },
      _react2.default.createElement('circle', { cx: '8', cy: '8', r: '7.75' }),
      _react2.default.createElement(
        'g',
        { strokeLinecap: 'round', strokeLinejoin: 'round' },
        _react2.default.createElement('path', { d: 'M4.962 4.93l6.293 6.292M4.932 11.18l6.293-6.294' })
      )
    )
  );
  toast({ text: text, title: title, timer: timer, callbackOk: callbackOk });
};

toast.offline = function (text, timer, callbackOk) {
  if (typeof timer === 'function') {
    callbackOk = arguments[1];
    timer = 2000;
  }
  var title = _react2.default.createElement(
    'svg',
    { width: '32', height: '32', viewBox: '0 0 16 16', xmlns: 'http://www.w3.org/2000/svg' },
    _react2.default.createElement(
      'g',
      { fill: 'none', fillRule: 'evenodd' },
      _react2.default.createElement('circle', { cx: '8', cy: '8', r: '7.75', strokeWidth: '.5', stroke: '#FFF' }),
      _react2.default.createElement(
        'g',
        { fill: '#FFF', transform: 'translate(4.444 5.778)' },
        _react2.default.createElement('circle', { cx: '.444', cy: '.444', r: '1' }),
        _react2.default.createElement('circle', { cx: '7.111', cy: '.444', r: '1' })
      ),
      _react2.default.createElement('path', { d: 'M11.177 11.557c-.457-1.295-1.693-2.223-3.144-2.223-1.452 0-2.687.928-3.145 2.223', stroke: '#FFF', strokeWidth: '.5', strokeLinecap: 'round', strokeLinejoin: 'round' })
    )
  );
  toast({ text: text, title: title, timer: timer, callbackOk: callbackOk });
};

toast.warning = function (text, timer, callbackOk) {
  if (typeof timer === 'function') {
    callbackOk = arguments[1];
    timer = 2000;
  }
  var title = _react2.default.createElement(
    'svg',
    { width: '32', height: '32', viewBox: '0 0 16 16', xmlns: 'http://www.w3.org/2000/svg' },
    _react2.default.createElement(
      'g',
      { fill: 'none', fillRule: 'evenodd' },
      _react2.default.createElement('circle', { cx: '8', cy: '8', r: '7.75', strokeWidth: '.5', stroke: '#FFF' }),
      _react2.default.createElement('path', { d: 'M7.573 4.444l.197 5.12c.004.12.102.214.222.214h.016c.12 0 .218-.095.222-.214l.197-5.12c.01-.236-.175-.435-.41-.444H8c-.236 0-.428.19-.428.428v.016zm.424 6.223c-.12 0-.224.037-.308.124-.092.082-.134.187-.134.318 0 .124.042.23.133.317.083.087.186.13.307.13.12 0 .23-.043.32-.124.085-.086.127-.19.127-.322 0-.13-.042-.236-.127-.317-.084-.086-.193-.123-.32-.123z', fill: '#FFF' })
    )
  );
  toast({ text: text, title: title, timer: timer, callbackOk: callbackOk });
};

toast.waiting = function (text, callbackOk) {
  var title = _react2.default.createElement('div', { className: _styles2.default['preloader'] });
  return toast({ text: text, title: title, timer: 0, callbackOk: callbackOk });
};