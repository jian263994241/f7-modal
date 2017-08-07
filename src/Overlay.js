import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import $ from 'dom7'
import styles from './styles'


export default class OverLay extends Component {

  static uiName = 'OverLay';

  static propTypes = {
    visible: PropTypes.bool,
    real: PropTypes.bool,
    type: PropTypes.string,
    modal: PropTypes.instanceOf(Element),
    ignore: PropTypes.func
  }

  static defaultProps = {
    visible: false,
    type: 'modal'
  }

  update = ()=>{
    const {visible} = this.props;
    const overLay = $(this.refs.overLay);
    if(visible){
      setTimeout(()=>{
        overLay.addClass(styles['modal-overlay-visible']);
      },16)
    }else{
      overLay.removeClass(styles['modal-overlay-visible']);
    }
  };

  ignore = (target)=>{
    return target.nodeName === 'INPUT';
  }

  watchOutside = (e)=>{
    const {modal, onClick, overlay, ignore} = this.props;
    const _ignore = ignore || this.ignore;
    if(overlay) return ;
    const el = modal;
    if (el && el.contains(e.target) || _ignore(e.target) ) {
       return false;
    }
    onClick && onClick();
  }

  componentDidUpdate(prevProps, prevState) {
    this.update();
  }

  componentDidMount() {
    this.update();
    $(document).on('click', this.watchOutside);
  }

  componentWillUnmount() {
    $(document).off('click', this.watchOutside);
  }

  render() {

    const {
      modal,
      visible,
      type,
      overlay,
      onTouchMove,
      className,
      ignore,
      ...rest
    } = this.props;

    const preventScrolling = (e) =>{
      e.preventDefault();
    };

    const cls = classnames({
      [styles['modal-overlay']]: type != 'popup',
      [styles['popup-overlay']]: type === 'popup',
      [styles['transparent']]:  (type === 'toast' || type === 'preloader'),
      [styles['picker-modal-overlay']]: type === 'picker'
    });

    if(overlay){
      return (
        <div className={cls} ref="overLay" onTouchMove={preventScrolling} {...rest}></div>
      );
    }else{
      return null;
    }
  }
}
