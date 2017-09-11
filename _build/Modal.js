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

var _rcMounter = require('rc-mounter');

var _rcMounter2 = _interopRequireDefault(_rcMounter);

var _OverLay = require('./OverLay');

var _OverLay2 = _interopRequireDefault(_OverLay);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(Modal, _Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      css: ''
    }, _this.getModal = function () {
      return _this.refs.modal;
    }, _this.update = function () {
      var _this$props = _this.props,
          visible = _this$props.visible,
          afterClose = _this$props.afterClose,
          fixTop = _this$props.fixTop;

      var modal = _this.refs.modal;
      if (visible) {
        modal.style.display = 'block';
        _this.fixTop();
        setTimeout(function () {
          _this.setState({
            css: _styles2.default['modal-in']
          });
        }, 16);
      } else {
        _this.setState({
          css: _styles2.default['modal-out']
        });
      }
    }, _this.fixTop = function () {
      var fixTop = _this.props.fixTop;

      var modal = _this.refs.modal;
      var topx = -Math.round(modal.offsetHeight / 2) - 8;
      if (!fixTop) return;
      modal.style.marginTop = topx + 'px';
    }, _this.getMounter = function () {
      return _this.refs.wrapper;
    }, _this._transitionEnd = function () {
      var _this$props2 = _this.props,
          visible = _this$props2.visible,
          afterClose = _this$props2.afterClose;

      var modal = _this.refs.modal;
      if (!visible) {
        _this.setState({ css: '' });
        modal.style.display = 'none';
        afterClose && afterClose();
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.update();
      this._transitionEnd();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.visible != prevProps.visible) {
        this.update();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          className = _props.className,
          containerCss = _props.containerCss,
          visible = _props.visible,
          onCancel = _props.onCancel,
          overlay = _props.overlay,
          afterClose = _props.afterClose,
          closeByOutside = _props.closeByOutside,
          mounter = _props.mounter,
          root = _props.root,
          type = _props.type,
          fixTop = _props.fixTop,
          ignore = _props.ignore,
          children = _props.children,
          rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'containerCss', 'visible', 'onCancel', 'overlay', 'afterClose', 'closeByOutside', 'mounter', 'root', 'type', 'fixTop', 'ignore', 'children']);


      var cls = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, _styles2.default['modal'], type === 'modal' || type === 'toast' || type === 'preloader'), (0, _defineProperty3.default)(_classnames, _styles2.default['popup'], type === 'popup'), (0, _defineProperty3.default)(_classnames, _styles2.default['actions-modal'], type === 'actions'), (0, _defineProperty3.default)(_classnames, _styles2.default['picker-modal'], type === 'picker'), (0, _defineProperty3.default)(_classnames, _styles2.default['popover'], type === 'popover'), (0, _defineProperty3.default)(_classnames, _styles2.default['modal-no-buttons'], type === 'toast'), (0, _defineProperty3.default)(_classnames, _styles2.default['preloader-modal'], type === 'preloader'), (0, _defineProperty3.default)(_classnames, _styles2.default['toast'], type === 'toast'), (0, _defineProperty3.default)(_classnames, this.state.css, true), _classnames), className);

      var Element = mounter ? _rcMounter2.default : 'div';

      return _react2.default.createElement(
        Element,
        { className: containerCss, ref: 'wrapper' },
        _react2.default.createElement(
          'div',
          (0, _extends3.default)({ className: cls,
            ref: 'modal',
            style: { display: 'block' }
          }, rest, {
            onTransitionEnd: this._transitionEnd
          }),
          children
        ),
        _react2.default.createElement(_OverLay2.default, { visible: visible, type: type, onClick: closeByOutside && onCancel, ignore: ignore, overlay: overlay, modal: this.refs.modal })
      );
    }
  }]);
  return Modal;
}(_react.Component), _class.uiName = 'Modal', _class.defaultProps = {
  visible: false,
  fixTop: true,
  type: 'modal',
  closeByOutside: true,
  overlay: true,
  mounter: true
}, _class.propTypes = {
  visible: _propTypes2.default.bool,
  afterClose: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  closeByOutside: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  containerCss: _propTypes2.default.string,
  fixTop: _propTypes2.default.bool,
  mounter: _propTypes2.default.bool,
  overlay: _propTypes2.default.bool
}, _temp2);
exports.default = Modal;