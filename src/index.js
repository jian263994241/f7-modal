
import Modal from './Modal'
import Popup from './Popup'
import Popover from './Popover'
import PickerModal from './PickerModal'
import ActionsModal from './ActionsModal'
import {alert, confirm, prompt, toast} from './Dialog'

Modal.alert = alert;
Modal.confirm = confirm;
Modal.prompt = prompt;
Modal.toast = toast;



export {Modal, Popup, Popover, PickerModal, ActionsModal};
