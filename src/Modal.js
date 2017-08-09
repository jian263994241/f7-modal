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

  getModal = ()=>{
    return this.refs.modal
  }

  update = (initial)=>{
    const {visible, afterClose, fixTop} = this.props;
    const modal = $(this.refs.modal);
    if(visible){
      // console.log('Modal Opened');
      modal.removeClass(styles['modal-out']).show();
      setTimeout(()=>{
        $(window).trigger('resize');
        modal.addClass(styles['modal-in']);
        if(fixTop){
          this.fixTop();
        }
      }, 16);
    }else{
      // console.log('Modal Closed');
      modal.removeClass(styles['modal-in']).addClass(styles['modal-out']);
      if(!initial){
        modal.transitionEnd((e)=>{
          modal.hide();
          afterClose && afterClose();
        });
      }
    }
  };

  fixTop = ()=>{
    const modal = $(this.refs.modal);
    const topx = - Math.round(modal.outerHeight() / 2) - 8 ;
    modal.css({marginTop:  topx+ 'px'});
  };

  getMounter = ()=>{
    return this.refs.mounter;
  };

  componentDidMount() {
    this.update(true);
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
      [styles['toast']]: type === 'toast'
    }, className);

    const innerElement = [
      <div className={cls} {...rest} ref="modal" key="modal">{children}</div>,
      <OverLay visible={visible} type={type} onClick={closeByOutside && onCancel} key="overlay" ignore={ignore} overlay={overlay} modal={this.refs.modal}></OverLay>
    ];

    if(mounter){
      return (
        <Mounter root={root} ref="mounter" className={containerCss}>{innerElement}</Mounter>
      );
    }

    return (
      <div className={containerCss}>{innerElement}</div>
    );
  }
}
