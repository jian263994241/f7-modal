'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noScroll = function noScroll(target) {
    var _this = this;

    (0, _classCallCheck3.default)(this, noScroll);

    this.on = function () {
        _this.target.style.overflow = 'hidden';
    };

    this.off = function () {
        _this.target.style.overflow = 'auto';
    };

    this.toggle = function () {
        var domPageContent = _this.target,
            styleOverflowValue = domPageContent.style.overflow;

        domPageContent.style.overflow = styleOverflowValue === 'hidden' ? 'auto' : 'hidden';
    };

    this.target = document.querySelector(target || '.page-content');
};

exports.default = noScroll;