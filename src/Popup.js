import React, {Component} from 'react'
import Modal from './Modal'

export default class Popup extends Component {

  static uiName = 'Popup';

  render() {

    const {
      children,
      ...rest
    } = this.props;

    return (
      <Modal {...rest} type="popup" fixTop={false}>{children}</Modal>
    );
  }
}
