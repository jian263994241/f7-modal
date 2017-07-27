import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import $ from 'dom7'
import styles from './styles'

export default class OverLay extends Component {

  static uiName = 'OverLay';

  static propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.string
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

  componentDidUpdate(prevProps, prevState) {
    this.update();
  }

  componentDidMount() {
    this.update();
  }

  render() {

    const {
      visible,
      type,
      onTouchMove,
      className,
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

    return (
      <div className={cls} ref="overLay" onTouchMove={preventScrolling} {...rest}></div>
    );
  }
}
