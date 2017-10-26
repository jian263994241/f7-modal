"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function renderModal(e){function t(){for(var e=arguments.length,t=Array(e),o=0;e>o;o++)t[o]=arguments[o];_reactDom.render(_react.cloneElement(n,{visible:!1,afterClose:function(){var e=_reactDom.unmountComponentAtNode(r);e&&r.parentNode&&r.parentNode.removeChild(r),a.onCancel&&a.onCancel.apply(a,t),clearTimeout(l),modalStackClearQueue()}}),r)}if(addQueue(renderModal.bind(this,e)))return!0;modalLock=!0;var a=_extends3.default({type:"modal"},e),r=document.createElement("div");document.body.appendChild(r);var l=null,n=null,o=void 0===a.maskClosable?!1:a.maskClosable,c=function(e){var t,a=e.children,r=e.bold,l=e.action,n=e.closeModal,o=_classnames3.default((t={},_defineProperty3.default(t,_styles2.default["modal-button"],!0),_defineProperty3.default(t,_styles2.default["modal-button-bold"],r),t)),c=function(){l&&l(),n&&n()};return _react2.default.createElement("span",{className:o,onClick:c},a)};return n=_react2.default.createElement(_Modal2.default,{visible:!0,fixTop:!0,closeByOutside:o,onCancel:t,mounter:!1,type:a.type},_react2.default.createElement("div",{className:_styles2.default["modal-inner"]},a.title&&_react2.default.createElement("div",{className:_styles2.default["modal-title"]},a.title),a.text&&_react2.default.createElement("div",{className:_styles2.default["modal-text"]},a.text),a.textAfter),a.buttons&&_react2.default.createElement("div",{className:_styles2.default["modal-buttons"]},a.buttons.map(function(e,a){return _react2.default.createElement(c,{action:e.click,closeModal:t,key:a},e.text)}))),_reactDom.render(n,r),"toast"===a.type&&a.timeout>0&&(l=setTimeout(t,a.timeout)),{destroy:t}}function alert(e){var t=e.title,a=e.text,r=e.onOk,l=e.okText,n=void 0===l?"确定":l;renderModal({title:t,text:a,buttons:[{click:r,text:n}]})}function confirm(e){var t=e.title,a=e.text,r=e.onOk,l=e.onCancel,n=e.okText,o=void 0===n?"确定":n,c=e.cancelText,i=void 0===c?"取消":c;renderModal({title:t,text:a,buttons:[{click:l,text:i},{click:r,text:o}]})}function prompt(e){var t=e.title,a=e.text,r=e.onOk,l=e.onCancel,n=e.okText,o=void 0===n?"确定":n,c=e.cancelText,i=void 0===c?"取消":c,u={},d=function(e){u.value=e.target.value,u.input=e.target},s=_react2.default.createElement("div",{className:_styles2.default["input-field"]},_react2.default.createElement("input",{type:"text",className:_styles2.default["modal-text-input"],onChange:d}));renderModal({title:t,text:a,textAfter:s,buttons:[{click:l,text:i},{click:r.bind(this,u),text:o}]})}function toast(e,t,a){if("[object Object]"===Object.prototype.toString.call(e)){var r=arguments[0],l=r.title,e=r.text,t=r.timer,a=r.callbackOk;r.closeByOutside}else{var l=null;"function"==typeof t&&(a=arguments[1],t=2e3)}t=void 0!=t?t:2e3,renderModal({title:l,text:e,type:"toast",maskClosable:!!t,onCancel:a,timeout:t})}Object.defineProperty(exports,"__esModule",{value:!0});var _defineProperty2=require("babel-runtime/helpers/defineProperty"),_defineProperty3=_interopRequireDefault(_defineProperty2),_extends2=require("babel-runtime/helpers/extends"),_extends3=_interopRequireDefault(_extends2);exports.alert=alert,exports.confirm=confirm,exports.prompt=prompt,exports.toast=toast;var _react=require("react"),_react2=_interopRequireDefault(_react),_reactDom=require("react-dom"),_propTypes=require("prop-types"),_propTypes2=_interopRequireDefault(_propTypes),_classnames2=require("classnames"),_classnames3=_interopRequireDefault(_classnames2),_rcMounter=require("rc-mounter"),_rcMounter2=_interopRequireDefault(_rcMounter),_Modal=require("./Modal"),_Modal2=_interopRequireDefault(_Modal),_styles=require("./styles"),_styles2=_interopRequireDefault(_styles),modalLock=!1,modalStack=[],modalStackClearQueue=function(){modalLock=!1,modalStack.length&&modalStack.shift()()},addQueue=function(e){return modalLock?(modalStack.push(e),!0):void 0};toast.sucess=function(e,t,a){"function"==typeof t&&(a=arguments[1],t=2e3);var r=_react2.default.createElement("svg",{width:"32",height:"32",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},_react2.default.createElement("g",{stroke:"#FFF",strokeWidth:".5",fill:"none",fillRule:"evenodd"},_react2.default.createElement("circle",{cx:"8",cy:"8",r:"7.75"}),_react2.default.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4.047 8.25l2.565 2.65 4.95-4.99"})));toast({text:e,title:r,timer:t,callbackOk:a})},toast.fail=function(e,t,a){"function"==typeof t&&(a=arguments[1],t=2e3);var r=_react2.default.createElement("svg",{width:"32",height:"32",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},_react2.default.createElement("g",{strokeWidth:".5",stroke:"#FFF",fill:"none",fillRule:"evenodd"},_react2.default.createElement("circle",{cx:"8",cy:"8",r:"7.75"}),_react2.default.createElement("g",{strokeLinecap:"round",strokeLinejoin:"round"},_react2.default.createElement("path",{d:"M4.962 4.93l6.293 6.292M4.932 11.18l6.293-6.294"}))));toast({text:e,title:r,timer:t,callbackOk:a})},toast.offline=function(e,t,a){"function"==typeof t&&(a=arguments[1],t=2e3);var r=_react2.default.createElement("svg",{width:"32",height:"32",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},_react2.default.createElement("g",{fill:"none",fillRule:"evenodd"},_react2.default.createElement("circle",{cx:"8",cy:"8",r:"7.75",strokeWidth:".5",stroke:"#FFF"}),_react2.default.createElement("g",{fill:"#FFF",transform:"translate(4.444 5.778)"},_react2.default.createElement("circle",{cx:".444",cy:".444",r:"1"}),_react2.default.createElement("circle",{cx:"7.111",cy:".444",r:"1"})),_react2.default.createElement("path",{d:"M11.177 11.557c-.457-1.295-1.693-2.223-3.144-2.223-1.452 0-2.687.928-3.145 2.223",stroke:"#FFF",strokeWidth:".5",strokeLinecap:"round",strokeLinejoin:"round"})));toast({text:e,title:r,timer:t,callbackOk:a})},toast.warning=function(e,t,a){"function"==typeof t&&(a=arguments[1],t=2e3);var r=_react2.default.createElement("svg",{width:"32",height:"32",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},_react2.default.createElement("g",{fill:"none",fillRule:"evenodd"},_react2.default.createElement("circle",{cx:"8",cy:"8",r:"7.75",strokeWidth:".5",stroke:"#FFF"}),_react2.default.createElement("path",{d:"M7.573 4.444l.197 5.12c.004.12.102.214.222.214h.016c.12 0 .218-.095.222-.214l.197-5.12c.01-.236-.175-.435-.41-.444H8c-.236 0-.428.19-.428.428v.016zm.424 6.223c-.12 0-.224.037-.308.124-.092.082-.134.187-.134.318 0 .124.042.23.133.317.083.087.186.13.307.13.12 0 .23-.043.32-.124.085-.086.127-.19.127-.322 0-.13-.042-.236-.127-.317-.084-.086-.193-.123-.32-.123z",fill:"#FFF"})));toast({text:e,title:r,timer:t,callbackOk:a})},toast.waiting=function(e,t){var a=_react2.default.createElement("div",{className:_styles2.default.preloader});return toast({text:e,title:a,timer:0,callbackOk:t})};