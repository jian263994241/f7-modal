import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Modal from './Modal'
import styles from './styles'

export default class ActionsModal extends Component {

  static uiName = 'ActionsModal';

  render() {

    const {
      children,
      ...rest
    } = this.props;

    return (
      <Modal {...rest} type="actions" fixTop={false}> {children} </Modal>
    );
  }

}

ActionsModal.ActionButton = function({bold, children, className, color, ...rest}){
  const cls = classnames({
    [styles['actions-modal-button']]: true,
    [styles['actions-modal-button-bold']]: bold
  }, className, color? `color-${color}`: undefined);
  return (
    <div className={cls} {...rest}>{children}</div>
  );
}

ActionsModal.ActionGroup = function({className, children, ...rest}){
  return (
    <div className={classnames(styles['actions-modal-group'], className)} {...rest}>{children}</div>
  );
}

ActionsModal.ActionLabel = function({className, children, ...rest}){
  return (
    <div className={classnames(styles['actions-modal-label'], className)} {...rest}>{children}</div>
  );
}
