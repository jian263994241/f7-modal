import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import PropTypes from 'prop-types'
import $ from 'dom7'
import Modal from './Modal'
import styles from './styles'

export default class Popover extends Component {

  static uiName = 'Popover';

  static propTypes = {
    content: PropTypes.element.isRequired,
    children: PropTypes.element.isRequired
  }

  state = {
    visible: false
  }

  resize = ()=> {
    const targetElement = findDOMNode(this.refs.target);
    const target = $(targetElement);
    const modal = $(this.refs.modal.getModal());
    const angle = $(this.refs.angle);

    var modalWidth =  modal.width();
    var modalHeight =  modal.height(); // 13 - height of angle
    var modalAngle, modalAngleSize = 0, modalAngleLeft, modalAngleTop;

    modalAngle = angle;
    modalAngleSize = modalAngle.width() / 2;
    modalAngle.removeClass(`${styles['on-left']} ${styles['on-right']} ${styles['on-top']} ${styles['on-bottom']}`).css({left: '', top: ''});

    var targetWidth = target.outerWidth();
    var targetHeight = target.outerHeight();
    var targetOffset = target.offset();
    var targetParentPage = target.parents('.page');
    if (targetParentPage.length > 0) {
        targetOffset.top = targetOffset.top - targetParentPage[0].scrollTop;
    }

    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    var modalTop = 0;
    var modalLeft = 0;
    var diff = 0;
    // Top Position
    var modalPosition = 'top';

    if ((modalHeight + modalAngleSize) < targetOffset.top) {
        // On top
        modalTop = targetOffset.top - modalHeight - modalAngleSize;
    }
    else if ((modalHeight + modalAngleSize) < windowHeight - targetOffset.top - targetHeight) {
        // On bottom
        modalPosition = 'bottom';
        modalTop = targetOffset.top + targetHeight + modalAngleSize;
    }
    else {
        // On middle
        modalPosition = 'middle';
        modalTop = targetHeight / 2 + targetOffset.top - modalHeight / 2;
        diff = modalTop;
        if (modalTop <= 0) {
            modalTop = 5;
        }
        else if (modalTop + modalHeight >= windowHeight) {
            modalTop = windowHeight - modalHeight - 5;
        }
        diff = diff - modalTop;
    }

    // Horizontal Position
    if (modalPosition === 'top' || modalPosition === 'bottom') {
        modalLeft = targetWidth / 2 + targetOffset.left - modalWidth / 2;
        diff = modalLeft;
        if (modalLeft < 5) modalLeft = 5;
        if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
        if (modalPosition === 'top') {
            modalAngle.addClass(styles['on-bottom']);
        }
        if (modalPosition === 'bottom') {
            modalAngle.addClass(styles['on-top']);
        }
        diff = diff - modalLeft;
        modalAngleLeft = (modalWidth / 2 - modalAngleSize + diff);
        modalAngleLeft = Math.max(Math.min(modalAngleLeft, modalWidth - modalAngleSize * 2 - 13), 13);
        modalAngle.css({left: modalAngleLeft + 'px'});

    }
    else if (modalPosition === 'middle') {
        modalLeft = targetOffset.left - modalWidth - modalAngleSize;
        modalAngle.addClass(styles['on-right']);
        if (modalLeft < 5 || (modalLeft + modalWidth > windowWidth)) {
            if (modalLeft < 5) modalLeft = targetOffset.left + targetWidth + modalAngleSize;
            if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
            modalAngle.removeClass(styles['on-right']).addClass(styles['on-left']);
        }
        modalAngleTop = (modalHeight / 2 - modalAngleSize + diff);
        modalAngleTop = Math.max(Math.min(modalAngleTop, modalHeight - modalAngleSize * 2 - 13), 13);
        modalAngle.css({top: modalAngleTop + 'px'});
    }

    // Apply Styles
    modal.css({top: modalTop + 'px', left: modalLeft + 'px'});
  }

  open = ()=>{
    this.setState({
      visible: true
    }, this.resize);
  }

  cancelHandler = ()=>{
    this.setState({
      visible: false
    });
  }

  render() {

    const {
      content,
      children,
      ...rest
    } =  this.props;

    const targetNode = React.Children.only(children);

    return (
      <div>
        {React.cloneElement(targetNode, {onClick: this.open, ref: 'target'})}
        <Modal
          ref="modal"
          type="popover"
          visible={this.state.visible}
          onCancel={this.cancelHandler}
          fixTop={false}
          mounter
          {...rest}
          >
          <div className={styles['popover-angle']} ref="angle"></div>
          <div className={styles['popover-inner']}>
            {content}
          </div>
        </Modal>
      </div>
    );
  }
}
