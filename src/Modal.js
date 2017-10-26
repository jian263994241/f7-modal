import React, {Component, cloneElement} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Mounter from 'rc-mounter'
import OverLay from './OverLay'
import styles from './styles'

export default class Modal extends Component {

  static uiName = 'Modal';

  static defaultProps = {
    visible: false,
    fixTop: true,
    type: 'modal',
    closeByOutside: true,
    overlay: true,
    mounter: true
  }

  static propTypes = {
    visible: PropTypes.bool,
    afterClose: PropTypes.func,
    onCancel: PropTypes.func,
    closeByOutside: PropTypes.bool,
    className: PropTypes.string,
    containerCss: PropTypes.string,
    fixTop: PropTypes.bool,
    mounter: PropTypes.bool,
    overlay: PropTypes.bool
  }

  state = {
    css: ''
  }

  getModal = ()=>{
    return this.refs.modal
  }

  update = ()=>{
    const {visible, afterClose, fixTop} = this.props;
    const modal = this.refs.modal;
    if(visible){
      modal.style.display = 'block';
      setTimeout(()=>{
        this.fixTop();
        modal.classList.remove(styles['modal-out']);
        modal.classList.add(styles['modal-in']);
      }, 150);
    }else{
      modal.classList.add(styles['modal-out']);
      modal.classList.remove(styles['modal-in']);
    }
  };

  fixTop = ()=>{
    if(!this.props.fixTop) return ;
    const modal = this.refs.modal;
    const topx = - Math.round(modal.offsetHeight / 2) - 8 ;
    modal.style.marginTop = topx + 'px';
  };

  getMounter = ()=>{
    return this.refs.wrapper;
  };

  _transitionEnd = ()=>{
    const {visible, afterClose} = this.props;
    const modal = this.refs.modal;
    if(!visible){
      modal.style.display = 'none';
      afterClose && afterClose();
    }
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.visible != prevProps.visible){
      this.update();
    }
  }

  render() {

    const {
      className,
      containerCss,
      visible,
      onCancel,
      overlay,
      afterClose,
      closeByOutside,
      mounter,
      root,
      type,
      fixTop,
      ignore,
      children,
      style,
      ...rest
    } = this.props;

    const cls = classnames({
      [styles['modal']]: (type === 'modal' || type === 'toast' || type === 'preloader'),
      [styles['popup']]: type === 'popup',
      [styles['actions-modal']]: type === 'actions',
      [styles['picker-modal']]: type === 'picker',
      [styles['popover']]: type === 'popover',
      [styles['modal-no-buttons']]: type==='toast',
      [styles['preloader-modal']]: type === 'preloader',
      [styles['toast']]: type === 'toast'
    }, className);

    const Element = mounter ? Mounter: 'div';

    return (
      <Element className={containerCss} ref="wrapper">
        <div className={cls}
          ref="modal"
          style={{display:'none', ...style}}
          onTransitionEnd={this._transitionEnd}
          {...rest}
          >{children}</div>
        <OverLay visible={visible} type={type} onClick={closeByOutside && onCancel} ignore={ignore} overlay={overlay} modal={this.refs.modal}></OverLay>
      </Element>
    );
  }
}
