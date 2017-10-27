import React, {Component, cloneElement} from 'react'
import {findDOMNode, render, unmountComponentAtNode} from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Mounter from 'rc-mounter'
import Modal from './Modal'
import styles from './styles'

let modalLock = false;

const modalStack = [];

const modalStackClearQueue = function () {
  modalLock = false;
  if (modalStack.length) {
      (modalStack.shift())();
  }
};

const addQueue = function(fn){
  if(modalLock){
    modalStack.push(fn);
    return true;
  }
};

function renderModal(config){

  if( addQueue( renderModal.bind(this, config) ) ) return true;

  modalLock = true;

  const props = {
    type: 'modal',
    ...config,
  };

  let div = document.createElement('div');
  document.body.appendChild(div);

  let timeoutFn = null, Dialog = null;

  function close(...args) {

    render(
      cloneElement(Dialog, {
        visible: false,
        afterClose(){
          const unmountResult = unmountComponentAtNode(div);
          if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
          }
          if (props.onCancel) {
            props.onCancel(...args);
          }
          clearTimeout(timeoutFn);
          modalStackClearQueue();
        }}
    ), div);


  }

  const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;

  let ActionButton = ({children, bold, action, closeModal})=>{
    const btnCss = classnames({
      [styles['modal-button']]: true,
      [styles['modal-button-bold']]: bold
    });
    const onClick = ()=>{
      action && action();
      closeModal && closeModal();
    }
    return (
      <span className={btnCss} onClick={onClick}>{children}</span>
    );
  };

  Dialog = (
    <Modal
      visible
      fixTop
      closeByOutside={maskClosable}
      onCancel = {close}
      mounter={false}
      type={props.type}
      >
      <div className={styles['modal-inner']}>
        {props.title && <div className={styles['modal-title']}>{props.title}</div>}
        {props.text && <div className={styles['modal-text']}>{props.text}</div>}
        {props.textAfter}
      </div>
      {
        props.buttons && (
          <div className={styles['modal-buttons']}>
            {
              props.buttons.map((item, index)=>(
                <ActionButton action={item.click} closeModal={close} key={index}>{item.text}</ActionButton>
              ))
            }
          </div>
        )
      }
    </Modal>
  )

  render(Dialog, div);

  if(props.type === 'toast' && props.timeout > 0){
    timeoutFn = setTimeout(close, props.timeout)
  }

  return {
    destroy: close,
  };

}


export function alert (parmas) {

  const {title, text, onOk, okText='确定'} = parmas;

  renderModal({
    title, text,
    buttons: [
      { click: onOk, text: okText }
    ]
  })
};


export function confirm (parmas) {

  const {title, text, onOk, onCancel, okText='确定', cancelText='取消'} = parmas;

  renderModal({
    title, text,
    buttons: [
      { click: onCancel, text: cancelText },
      { click: onOk, text: okText },
    ]
  })
};

export function prompt(parmas) {

  const {title, text, onOk, onCancel, okText='确定', cancelText='取消'} = parmas;

  let target = {};

  const inputField = (e)=>{
    target.value = e.target.value;
    target.input = e.target;
  }

  const input = (
    <div className={styles['input-field']}>
      <input type="text" className={styles['modal-text-input']} onChange={inputField}/>
    </div>
  );

  renderModal({
    title, text,
    textAfter: input,
    buttons: [
      { click: onCancel, text: cancelText },
      { click: onOk.bind(this, target), text: okText },
    ]
  })

}

export function toast (text, timer, callbackOk){

  // if( addQueue( toast.bind(this, text, timer, callbackOk) ) ) return true;

  if(Object.prototype.toString.call(text) === '[object Object]'){
    var {title, text, timer, callbackOk, closeByOutside} = arguments[0];
  }else{

    var title = null, closeByOutside = true;

    if (typeof timer === 'function') {
      callbackOk = arguments[1];
      timer = 2000;
    }
  }

  timer = timer != undefined ? timer: 2000;

  renderModal({
    title, text,
    type: 'toast',
    maskClosable: !!timer,
    onCancel: callbackOk,
    timeout: timer,
  })

}

toast.success = function (text, timer, callbackOk){
  if (typeof timer === 'function') {
    callbackOk = arguments[1];
    timer = 2000;
  }

  const title = (
    <svg width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#FFF" strokeWidth=".5" fill="none" fillRule="evenodd">
        <circle cx="8" cy="8" r="7.75"/><path strokeLinecap="round" strokeLinejoin="round" d="M4.047 8.25l2.565 2.65 4.95-4.99"/>
      </g>
    </svg>
  );
  toast( {text, title, timer, callbackOk} );
}

toast.fail = function(text, timer, callbackOk){
  if (typeof timer === 'function') {
    callbackOk = arguments[1];
    timer = 2000;
  }
  const title = (
    <svg width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g strokeWidth=".5" stroke="#FFF" fill="none" fillRule="evenodd">
        <circle cx="8" cy="8" r="7.75"/>
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.962 4.93l6.293 6.292M4.932 11.18l6.293-6.294"/>
        </g>
      </g>
    </svg>
  );
  toast({text, title, timer, callbackOk});
}

toast.offline = function(text, timer, callbackOk){
  if (typeof timer === 'function') {
    callbackOk = arguments[1];
    timer = 2000;
  }
  const title = (
    <svg width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <circle cx="8" cy="8" r="7.75" strokeWidth=".5" stroke="#FFF"/>
        <g fill="#FFF" transform="translate(4.444 5.778)">
          <circle cx=".444" cy=".444" r="1"/>
          <circle cx="7.111" cy=".444" r="1"/>
        </g>
        <path d="M11.177 11.557c-.457-1.295-1.693-2.223-3.144-2.223-1.452 0-2.687.928-3.145 2.223" stroke="#FFF" strokeWidth=".5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
  toast({text, title, timer, callbackOk});
}

toast.warning = function(text, timer, callbackOk){
  if (typeof timer === 'function') {
    callbackOk = arguments[1];
    timer = 2000;
  }
  const title = (
    <svg width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <circle cx="8" cy="8" r="7.75" strokeWidth=".5" stroke="#FFF"/>
        <path d="M7.573 4.444l.197 5.12c.004.12.102.214.222.214h.016c.12 0 .218-.095.222-.214l.197-5.12c.01-.236-.175-.435-.41-.444H8c-.236 0-.428.19-.428.428v.016zm.424 6.223c-.12 0-.224.037-.308.124-.092.082-.134.187-.134.318 0 .124.042.23.133.317.083.087.186.13.307.13.12 0 .23-.043.32-.124.085-.086.127-.19.127-.322 0-.13-.042-.236-.127-.317-.084-.086-.193-.123-.32-.123z" fill="#FFF"/>
      </g>
    </svg>
  );
  toast({text, title, timer, callbackOk});
}

toast.waiting = function(text, callbackOk){
  const title = (
    <div className={styles['preloader']}></div>
  );
  return toast({text, title, timer: 0, callbackOk});
}
