'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionsModal = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ActionsModal, _Component);

  function ActionsModal() {
    (0, _classCallCheck3.default)(this, ActionsModal);
    return (0, _possibleConstructorReturn3.default)(this, (ActionsModal.__proto__ || (0, _getPrototypeOf2.default)(ActionsModal)).apply(this, arguments));
  }

  (0, _createClass3.default)(ActionsModal, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          rest = (0, _objectWithoutProperties3.default)(_props, ['children']);


      return _react2.default.createElement(
        _Modal2.default,
        (0, _extends3.default)({}, rest, { type: 'actions', fixTop: false }),
        ' ',
        children,
        ' '
      );
    }
  }]);
  return ActionsModal;
}(_react.Component), _class.uiName = 'ActionsModal', _temp);
exports.default = ActionsModal;


ActionsModal.ActionButton = function (_ref) {
  var _classnames;

  var bold = _ref.bold,
      children = _ref.children,
      className = _ref.className,
      color = _ref.color,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['bold', 'children', 'className', 'color']);

  var cls = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, _styles2.default['actions-modal-button'], true), (0, _defineProperty3.default)(_classnames, _styles2.default['actions-modal-button-bold'], bold), _classnames), className, color ? 'color-' + color : undefined);
  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: cls }, rest),
    children
  );
};

ActionsModal.ActionGroup = function (_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['className', 'children']);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: (0, _classnames3.default)(_styles2.default['actions-modal-group'], className) }, rest),
    children
  );
};

ActionsModal.ActionLabel = function (_ref3) {
  var className = _ref3.className,
      children = _ref3.children,
      rest = (0, _objectWithoutProperties3.default)(_ref3, ['className', 'children']);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: (0, _classnames3.default)(_styles2.default['actions-modal-label'], className) }, rest),
    children
  );
};