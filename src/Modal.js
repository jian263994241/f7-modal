import React, {Component, cloneElement} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import $ from 'dom7'
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
      this.fixTop();
      setTimeout(()=>{
        this.setState({
          css: styles['modal-in']
        });
      }, 16);
    }else{
      this.setState({
        css: styles['modal-out']
      });
    }
  };

  fixTop = ()=>{
    const {fixTop} = this.props;
    const modal = this.refs.modal;
    const topx = - Math.round(modal.offsetHeight / 2) - 8 ;
    if(!fixTop) return ;
    modal.style.marginTop = topx + 'px';
  };

  getMounter = ()=>{
    return this.refs.wrapper;
  };

  _transitionEnd = ()=>{
    const {visible, afterClose} = this.props;
    const modal = this.refs.modal;
    if(!visible){
      this.setState({css:''});
      modal.style.display = 'none';
      afterClose && afterClose();
    }
  }

  componentDidMount() {
    this.update();
    this._transitionEnd();
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
      [styles['toast']]: type === 'toast',
      [this.state.css]: true
    }, className);

    const Element = mounter? Mounter: 'div';

    return (
      <Element className={containerCss} ref="wrapper">
        <div className={cls}
          ref="modal"
          style={{display:'block'}}
          {...rest}
          onTransitionEnd={this._transitionEnd}
          >{children}</div>,
        <OverLay visible={visible} type={type} onClick={closeByOutside && onCancel} ignore={ignore} overlay={overlay} modal={this.refs.modal}></OverLay>
      </Element>
    );
  }
}
