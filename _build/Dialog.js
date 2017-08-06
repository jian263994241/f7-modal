'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

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

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _rcMounter = require('rc-mounter');

var _rcMounter2 = _interopRequireDefault(_rcMounter);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal2 = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(Modal2, _Component);

  function Modal2() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Modal2);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Modal2.__proto__ || (0, _getPrototypeOf2.default)(Modal2)).call.apply(_ref, [this].concat(args))), _this), _this.afterClose = function () {
      var mounter = _this.refs.modal.getMounter();
      mounter.destroy();
      modalStackClearQueue();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Modal2, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          text = _props.text,
          textAfter = _props.textAfter,
          children = _props.children,
          rest = (0, _objectWithoutProperties3.default)(_props, ['title', 'text', 'textAfter', 'children']);


      return _react2.default.createElement(
        _Modal2.default,
        (0, _extends3.default)({
          ref: 'modal',
          visible: true,
          closeByOutside: false,
          fixTop: true,
          mounter: true,
          afterClose: this.afterClose
        }, rest),
        _react2.default.createElement(
          'div',
          { className: _styles2.default['modal-inner'] },
          title && _react2.default.createElement(
            'div',
            { className: _styles2.default['modal-title'] },
            title
          ),
          text && _react2.default.createElement(
            'div',
            { className: _styles2.default['modal-text'] },
            text
          ),
          textAfter
        ),
        children
      );
    }
  }]);
  return Modal2;
}(_react.Component), _class.ButtonGroup = function (_ref2) {
  var children = _ref2.children,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['children']);
  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: _styles2.default['modal-buttons'] }, rest),
    children
  );
}, _class.Button = function (_ref3) {
  var _classnames;

  var children = _ref3.children,
      bold = _ref3.bold,
      rest = (0, _objectWithoutProperties3.default)(_ref3, ['children', 'bold']);

  var btnCss = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, _styles2.default['modal-button'], true), (0, _defineProperty3.default)(_classnames, _styles2.default['modal-button-bold'], bold), _classnames));
  return _react2.default.createElement(
    'span',
    (0, _extends3.default)({ className: btnCss }, rest),
    children
  );
}, _temp2);


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
    Modal2,
    { title: title, text: text },
    _react2.default.createElement(
      Modal2.ButtonGroup,
      null,
      _react2.default.createElement(
        Modal2.Button,
        { onClick: clickOk },
        okText
      )
    )
  ));
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
    Modal2,
    { title: title, text: text },
    _react2.default.createElement(
      Modal2.ButtonGroup,
      null,
      _react2.default.createElement(
        Modal2.Button,
        (0, _defineProperty3.default)({ onClick: clickOk }, 'onClick', clickCancel),
        cancelText
      ),
      _react2.default.createElement(
        Modal2.Button,
        { onClick: clickOk, bold: true },
        okText
      )
    )
  ));
};

function prompt(parmas) {
  var _this2 = this;

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
    mounted.updateProps({ visible: false }, onOk.bind(_this2, value));
  };

  var clickCancel = function clickCancel() {
    mounted.updateProps({ visible: false }, onCancel);
  };

  modalLock = true;

  var input = _react2.default.createElement(
    'div',
    { className: _styles2.default['input-field'] },
    _react2.default.createElement('input', { type: 'text', className: _styles2.default['modal-text-input'], onChange: inputField })
  );

  var mounted = _rcMounter2.default.mount(_react2.default.createElement(
    Modal2,
    { title: title, text: text, textAfter: input },
    _react2.default.createElement(
      Modal2.ButtonGroup,
      null,
      _react2.default.createElement(
        Modal2.Button,
        (0, _defineProperty3.default)({ onClick: clickOk }, 'onClick', clickCancel),
        cancelText
      ),
      _react2.default.createElement(
        Modal2.Button,
        { onClick: clickOk, bold: true },
        okText
      )
    )
  ));
}

function toast(text, timer, callbackOk) {

  if (addQueue(toast.bind(this, text, timer, callbackOk))) return true;

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
    }
  }

  timer = timer || 2000;

  var onCancel = function onCancel() {
    mounted.updateProps({ visible: false }, callbackOk);
  };

  setTimeout(onCancel, timer);

  modalLock = true;

  var mounted = _rcMounter2.default.mount(_react2.default.createElement(Modal2, {
    type: 'toast',
    closeByOutside: closeByOutside,
    onCancel: onCancel,
    text: text,
    title: title
  }));

  return onCancel;
}

toast.sucess = function (text, timer, callbackOk) {
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

toast.waiting = function (text) {
  var title = _react2.default.createElement('div', { className: _styles2.default['preloader'] });
  return toast({ text: text, title: title, closeByOutside: false });
};