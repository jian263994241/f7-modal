'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PickerModal = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(PickerModal, _Component);

  function PickerModal() {
    (0, _classCallCheck3.default)(this, PickerModal);
    return (0, _possibleConstructorReturn3.default)(this, (PickerModal.__proto__ || (0, _getPrototypeOf2.default)(PickerModal)).apply(this, arguments));
  }

  (0, _createClass3.default)(PickerModal, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          toolbar = _props.toolbar,
          innerCss = _props.innerCss,
          onCancel = _props.onCancel,
          cancelText = _props.cancelText,
          children = _props.children,
          rest = (0, _objectWithoutProperties3.default)(_props, ['toolbar', 'innerCss', 'onCancel', 'cancelText', 'children']);


      var type = 'picker';

      var preset = toolbar === undefined ? _react2.default.createElement(
        'div',
        { className: _styles2.default['toolbar'] },
        _react2.default.createElement(
          'div',
          { className: _styles2.default['toolbar-inner'] },
          _react2.default.createElement('div', { className: 'left' }),
          _react2.default.createElement(
            'div',
            { className: 'right' },
            _react2.default.createElement(
              'a',
              { onClick: onCancel, className: 'link' },
              cancelText
            )
          )
        )
      ) : toolbar;

      return _react2.default.createElement(
        _Modal2.default,
        (0, _extends3.default)({ type: 'picker', onCancel: onCancel, fixTop: false }, rest),
        preset,
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_styles2.default['picker-modal-inner'], innerCss) },
          children
        )
      );
    }
  }]);
  return PickerModal;
}(_react.Component), _class.uiName = 'PickerModal', _class.propTypes = {
  cancelText: _propTypes2.default.string,
  onCancel: _propTypes2.default.func,
  toolbar: _propTypes2.default.element,
  innerCss: _propTypes2.default.string
}, _class.defaultProps = {
  cancelText: '关闭'
}, _temp);
exports.default = PickerModal;