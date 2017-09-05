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
    style: {display: 'block'},
    css: ''
  }

  getModal = ()=>{
    return this.refs.modal
  }

  update = ()=>{
    const {visible, afterClose, fixTop} = this.props;

    if(visible){
      this.setState({
        style: {display: 'block'},
      });
      setTimeout(()=>{
        $(window).trigger('resize');
        this.setState({
          css: styles['modal-in'],
          style: {
            display: 'block',
            marginTop:  fixTop ? this.fixTop() : null
          }
        });
      }, 16);
    }else{
      this.setState({
        css: styles['modal-out']
      });
    }
  };

  fixTop = ()=>{
    const modal = $(this.refs.modal);
    const topx = - Math.round(modal.outerHeight() / 2) - 8 ;
    return topx+ 'px';
  };

  getMounter = ()=>{
    return this.refs.mounter;
  };

  _transitionEnd = ()=>{
    const {visible, afterClose} = this.props;
    if(!visible){
      this.setState({
        css: '',
        style: {display: 'none'},
      });
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
      [styles['toast']]: type === 'toast',
      [this.state.css]: true
    }, className);

    const _style = {...this.state.style, ...style};

    const innerElement = [
      <div className={cls}
        ref="modal"
        key="modal"
        style={_style}
        {...rest}
        onTransitionEnd={this._transitionEnd}
        >{children}</div>,
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
