import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Modal from './Modal'
import styles from './styles'

export default class PickerModal extends Component {

  static uiName = 'PickerModal';

  static propTypes = {
    cancelText: PropTypes.string,
    onCancel: PropTypes.func,
    toolbar: PropTypes.element,
    innerCss: PropTypes.string
  }

  static defaultProps = {
    cancelText: '关闭'
  }

  render() {

    const {
      toolbar,
      innerCss,
      onCancel,
      cancelText,
      children,
      ...rest
    } = this.props;

    const type = 'picker';

    const preset = (toolbar === undefined) ? (
      <div className={styles['toolbar']}>
        <div className={styles['toolbar-inner']}>
          <div className="left"></div>
          <div className="right"><a onClick={onCancel} className="link">{cancelText}</a></div>
        </div>
      </div>
    ) : toolbar;

    return (
      <Modal type="picker" onCancel={onCancel} fixTop={false} {...rest}>
        {preset}
        <div className={classnames(styles['picker-modal-inner'], innerCss)}>
          {children}
        </div>
      </Modal>
    );
  }
}
