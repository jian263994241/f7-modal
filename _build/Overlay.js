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

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

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

      var overLay = (0, _dom2.default)(_this.refs.overLay);
      if (visible) {
        setTimeout(function () {
          overLay.addClass('modal-overlay-visible');
        }, 16);
      } else {
        overLay.removeClass('modal-overlay-visible');
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
      var _props = this.props,
          visible = _props.visible,
          type = _props.type,
          onTouchMove = _props.onTouchMove,
          className = _props.className,
          other = (0, _objectWithoutProperties3.default)(_props, ['visible', 'type', 'onTouchMove', 'className']);


      var preventScrolling = function preventScrolling(e) {
        e.preventDefault();
      };

      var cls = (0, _classnames2.default)({
        'modal-overlay': type != 'popup',
        'popup-overlay': type === 'popup',
        'transparent': type === 'toast' || type === 'preloader',
        'picker-modal-overlay': type === 'picker'
      });

      return _react2.default.createElement('div', (0, _extends3.default)({ className: cls, ref: 'overLay', onTouchMove: preventScrolling }, other));
    }
  }]);
  return OverLay;
}(_react.Component), _class.uiName = 'OverLay', _class.propTypes = {
  visible: _propTypes2.default.bool,
  type: _propTypes2.default.string
}, _class.defaultProps = {
  visible: false,
  type: 'modal'
}, _temp2);
exports.default = OverLay;