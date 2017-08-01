import React, {Component} from 'react'
import {findDOMNode, render} from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import $ from 'dom7'
import Mounter from 'rc-mounter'
import Modal from './Modal'
import styles from './styles'

class Modal2 extends Component {

  static ButtonGroup = ({children, ...rest})=>(
    <div className={styles['modal-buttons']} {...rest}>{children}</div>
  );

  static Button = ({children, bold, ...rest})=>{
    const btnCss = classnames({
      [styles['modal-button']]: true,
      [styles['modal-button-bold']]: bold
    });
    return (
      <span className={btnCss} {...rest}>{children}</span>
    );
  }

  afterClose = ()=>{
    const mounter = this.refs.modal.getMounter();
    mounter.destroy();
    modalStackClearQueue();
  }

  render() {

    const {
      title,
      text,
      textAfter,
      children,
      ...rest
    } = this.props;

    return (
      <Modal
        ref="modal"
        visible={true}
        closeByOutside={false}
        fixTop
        mounter
        afterClose={this.afterClose}
        {...rest}
        >
        <div className={styles['modal-inner']}>
          <div className={styles['modal-title']}>{title}</div>
          <div className={styles['modal-text']}>{text}</div>
          {textAfter}
        </div>
        {children}
      </Modal>
    );
  }
}



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


export function alert (parmas) {

  if( addQueue( alert.bind(this, parmas) ) ) return true;

  const {title, text, onOk, okText='确定'} = parmas;

  const clickOk = ()=>{
    mounted.updateProps({visible: false}, onOk);
  }

  modalLock = true;

  const mounted = Mounter.mount(
    <Modal2 title={title} text={text}>
      <Modal2.ButtonGroup>
        <Modal2.Button onClick={clickOk}>{okText}</Modal2.Button>
      </Modal2.ButtonGroup>
    </Modal2>
  );
};


export function confirm (parmas) {


  if( addQueue( confirm.bind(this, parmas) ) ) return true;

  const {title, text, onOk, onCancel, okText='确定', cancelText='取消'} = parmas;

  const clickOk = ()=>{
    mounted.updateProps({visible: false}, onOk);
  }

  const clickCancel = ()=>{
    mounted.updateProps({visible: false}, onCancel);
  }

  modalLock = true;

  const mounted = Mounter.mount(
    <Modal2 title={title} text={text}>
      <Modal2.ButtonGroup>
        <Modal2.Button onClick={clickOk} onClick={clickCancel}>{cancelText}</Modal2.Button>
        <Modal2.Button onClick={clickOk} bold>{okText}</Modal2.Button>
      </Modal2.ButtonGroup>
    </Modal2>
  );

};

export function prompt(parmas) {


  if( addQueue( prompt.bind(this, arguments) ) ) return true;

  const {title, text, onOk, onCancel, okText='确定', cancelText='取消'} = parmas;

  let value = null;

  const inputField = (e)=>{
    value = e.target.value;
  }

  const clickOk = ()=>{
    mounted.updateProps({visible: false}, onOk.bind(this, value));
  }

  const clickCancel = ()=>{
    mounted.updateProps({visible: false}, onCancel);
  }

  modalLock = true;

  const input = (
    <div className={styles['input-field']}>
      <input type="text" className={styles['modal-text-input']} onChange={inputField}/>
    </div>
  );

  const mounted = Mounter.mount(
    <Modal2 title={title} text={text} textAfter={input}>
      <Modal2.ButtonGroup>
        <Modal2.Button onClick={clickOk} onClick={clickCancel}>{cancelText}</Modal2.Button>
        <Modal2.Button onClick={clickOk} bold>{okText}</Modal2.Button>
      </Modal2.ButtonGroup>
    </Modal2>
  );
}



export function toast (text, timer, callbackOk){
  if (typeof timer === 'function' || typeof timer === 'undefined') {
    callbackOk = arguments[1];
    timer = 1500;
  }
  let title = null;

  if(Array.isArray(text)){
    title = text[1];
    text = text[0];
  }

  if( addQueue( toast.bind(this, arguments) ) ) return true;

  const onCancel = ()=>{
    mounted.updateProps({visible: false}, callbackOk);
  }

  setTimeout(onCancel, timer);

  modalLock = true;

  const mounted = Mounter.mount(
    <Modal2
      type="toast"
      closeByOutside={true}
      onCancel={onCancel}
      text={text}
      title={title}
    />
  );
}

toast.sucess = function (text, timer, callbackOk){
  const title = (
    <svg width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <title>成功提示</title>
      <g stroke="#FFF" strokeWidth=".5" fill="none" fillRule="evenodd">
        <circle cx="8" cy="8" r="7.75"/><path strokeLinecap="round" strokeLinejoin="round" d="M4.047 8.25l2.565 2.65 4.95-4.99"/>
      </g>
    </svg>
  );
  toast([text, title], timer, callbackOk );
}

toast.fail = function(text, timer, callbackOk){
  const title = (
    <svg width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <title>失败提示</title>
      <g strokeWidth=".5" stroke="#FFF" fill="none" fillRule="evenodd">
        <circle cx="8" cy="8" r="7.75"/>
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.962 4.93l6.293 6.292M4.932 11.18l6.293-6.294"/>
        </g>
      </g>
    </svg>
  );
  toast([text, title], timer, callbackOk );
}

toast.offline = function(text, timer, callbackOk){
  const title = (
    <svg width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <title>网络提示</title>
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
  toast([text, title], timer, callbackOk );
}

toast.warning = function(text, timer, callbackOk){
  const title = (
    <svg width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <title>警示提示</title>
      <g fill="none" fillRule="evenodd">
        <circle cx="8" cy="8" r="7.75" strokeWidth=".5" stroke="#FFF"/>
        <path d="M7.573 4.444l.197 5.12c.004.12.102.214.222.214h.016c.12 0 .218-.095.222-.214l.197-5.12c.01-.236-.175-.435-.41-.444H8c-.236 0-.428.19-.428.428v.016zm.424 6.223c-.12 0-.224.037-.308.124-.092.082-.134.187-.134.318 0 .124.042.23.133.317.083.087.186.13.307.13.12 0 .23-.043.32-.124.085-.086.127-.19.127-.322 0-.13-.042-.236-.127-.317-.084-.086-.193-.123-.32-.123z" fill="#FFF"/>
      </g>
    </svg>
  );
  toast([text, title], timer, callbackOk );
}
