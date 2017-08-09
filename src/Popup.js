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
      <Modal type="popup" fixTop={false} mounter {...rest}>{children}</Modal>
    );
  }
}
