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

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Popover = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(Popover, _Component);

  function Popover() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Popover);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Popover.__proto__ || (0, _getPrototypeOf2.default)(Popover)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      visible: false
    }, _this.resize = function () {
      var targetElement = (0, _reactDom.findDOMNode)(_this.refs.target);
      var target = (0, _dom2.default)(targetElement);
      var modal = (0, _dom2.default)(_this.refs.modal.getModal());
      var angle = (0, _dom2.default)(_this.refs.angle);

      var modalWidth = modal.width();
      var modalHeight = modal.height(); // 13 - height of angle
      var modalAngle,
          modalAngleSize = 0,
          modalAngleLeft,
          modalAngleTop;

      modalAngle = angle;
      modalAngleSize = modalAngle.width() / 2;
      modalAngle.removeClass(_styles2.default['on-left'] + ' ' + _styles2.default['on-right'] + ' ' + _styles2.default['on-top'] + ' ' + _styles2.default['on-bottom']).css({ left: '', top: '' });

      var targetWidth = target.outerWidth();
      var targetHeight = target.outerHeight();
      var targetOffset = target.offset();
      var targetParentPage = target.parents('.page');
      if (targetParentPage.length > 0) {
        targetOffset.top = targetOffset.top - targetParentPage[0].scrollTop;
      }

      var windowHeight = (0, _dom2.default)(window).height();
      var windowWidth = (0, _dom2.default)(window).width();

      var modalTop = 0;
      var modalLeft = 0;
      var diff = 0;
      // Top Position
      var modalPosition = 'top';

      if (modalHeight + modalAngleSize < targetOffset.top) {
        // On top
        modalTop = targetOffset.top - modalHeight - modalAngleSize;
      } else if (modalHeight + modalAngleSize < windowHeight - targetOffset.top - targetHeight) {
        // On bottom
        modalPosition = 'bottom';
        modalTop = targetOffset.top + targetHeight + modalAngleSize;
      } else {
        // On middle
        modalPosition = 'middle';
        modalTop = targetHeight / 2 + targetOffset.top - modalHeight / 2;
        diff = modalTop;
        if (modalTop <= 0) {
          modalTop = 5;
        } else if (modalTop + modalHeight >= windowHeight) {
          modalTop = windowHeight - modalHeight - 5;
        }
        diff = diff - modalTop;
      }

      // Horizontal Position
      if (modalPosition === 'top' || modalPosition === 'bottom') {
        modalLeft = targetWidth / 2 + targetOffset.left - modalWidth / 2;
        diff = modalLeft;
        if (modalLeft < 5) modalLeft = 5;
        if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
        if (modalPosition === 'top') {
          modalAngle.addClass(_styles2.default['on-bottom']);
        }
        if (modalPosition === 'bottom') {
          modalAngle.addClass(_styles2.default['on-top']);
        }
        diff = diff - modalLeft;
        modalAngleLeft = modalWidth / 2 - modalAngleSize + diff;
        modalAngleLeft = Math.max(Math.min(modalAngleLeft, modalWidth - modalAngleSize * 2 - 13), 13);
        modalAngle.css({ left: modalAngleLeft + 'px' });
      } else if (modalPosition === 'middle') {
        modalLeft = targetOffset.left - modalWidth - modalAngleSize;
        modalAngle.addClass(_styles2.default['on-right']);
        if (modalLeft < 5 || modalLeft + modalWidth > windowWidth) {
          if (modalLeft < 5) modalLeft = targetOffset.left + targetWidth + modalAngleSize;
          if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
          modalAngle.removeClass(_styles2.default['on-right']).addClass(_styles2.default['on-left']);
        }
        modalAngleTop = modalHeight / 2 - modalAngleSize + diff;
        modalAngleTop = Math.max(Math.min(modalAngleTop, modalHeight - modalAngleSize * 2 - 13), 13);
        modalAngle.css({ top: modalAngleTop + 'px' });
      }

      // Apply Styles
      modal.css({ top: modalTop + 'px', left: modalLeft + 'px' });
    }, _this.open = function () {
      _this.setState({
        visible: true
      }, _this.resize);
    }, _this.cancelHandler = function () {
      _this.setState({
        visible: false
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Popover, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          content = _props.content,
          children = _props.children,
          rest = (0, _objectWithoutProperties3.default)(_props, ['content', 'children']);


      var targetNode = _react2.default.Children.only(children);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.cloneElement(targetNode, { onClick: this.open, ref: 'target' }),
        _react2.default.createElement(
          _Modal2.default,
          (0, _extends3.default)({
            ref: 'modal',
            type: 'popover',
            visible: this.state.visible,
            onCancel: this.cancelHandler,
            fixTop: false,
            mounter: true
          }, rest),
          _react2.default.createElement('div', { className: _styles2.default['popover-angle'], ref: 'angle' }),
          _react2.default.createElement(
            'div',
            { className: _styles2.default['popover-inner'] },
            content
          )
        )
      );
    }
  }]);
  return Popover;
}(_react.Component), _class.uiName = 'Popover', _class.propTypes = {
  content: _propTypes2.default.element.isRequired,
  children: _propTypes2.default.element.isRequired
}, _temp2);
exports.default = Popover;