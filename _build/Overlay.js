'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OverLay = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(OverLay, _Component);

  function OverLay() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, OverLay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = OverLay.__proto__ || (0, _getPrototypeOf2.default)(OverLay)).call.apply(_ref, [this].concat(args))), _this), _this.update = function () {
      var visible = _this.props.visible;

      var overLay = _this.refs.overLay;
      if (visible) {
        overLay.style.display = 'block';
        setTimeout(function () {
          overLay.classList.add(_styles2.default['modal-overlay-visible']);
        }, 150);
      } else {
        overLay.classList.remove(_styles2.default['modal-overlay-visible']);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(OverLay, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      this.update();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.update();
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          modal = _props.modal,
          visible = _props.visible,
          type = _props.type,
          onTouchMove = _props.onTouchMove,
          className = _props.className,
          rest = (0, _objectWithoutProperties3.default)(_props, ['modal', 'visible', 'type', 'onTouchMove', 'className']);


      var preventScrolling = function preventScrolling(e) {
        e.preventDefault();
      };

      var cls = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, _styles2.default['modal-overlay'], type != 'popup'), (0, _defineProperty3.default)(_classnames, _styles2.default['popup-overlay'], type === 'popup'), (0, _defineProperty3.default)(_classnames, _styles2.default['transparent'], type === 'toast' || type === 'preloader'), (0, _defineProperty3.default)(_classnames, _styles2.default['picker-modal-overlay'], type === 'picker'), _classnames));

      return _react2.default.createElement('div', (0, _extends3.default)({ className: cls, ref: 'overLay', onTouchMove: preventScrolling, style: { display: 'none' } }, rest));
    }
  }]);
  return OverLay;
}(_react.Component), _class.uiName = 'OverLay', _class.propTypes = {
  visible: _propTypes2.default.bool,
  real: _propTypes2.default.bool,
  type: _propTypes2.default.string,
  modal: _propTypes2.default.instanceOf(Element)
}, _class.defaultProps = {
  visible: false,
  type: 'modal'
}, _temp2);
exports.default = OverLay;