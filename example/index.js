import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Modal, Popup} from '../src';

Modal.toast('toast0', ()=>console.log('toast'))
Modal.toast('toast1', ()=>console.log('toast'))
Modal.toast.success('toast12', ()=>console.log('toast'))

class Example extends Component {

  state = {
    modal: false,
    popup: false
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={()=>this.setState({modal:true})}>Modal</button>
          <Modal visible={this.state.modal}>
            <button onClick={()=>this.setState({modal:false})}>Close Modal</button>
          </Modal>
        </div>
        <div>
          <button onClick={()=>this.setState({popup:true})}>Popup</button>
          <Popup  visible={this.state.popup}>
            <button onClick={()=>this.setState({popup:false})}>Close Popup</button>
          </Popup>
        </div>
        <div>
          <button onClick={()=>Modal.alert({text: 'alert', onOk:()=>{console.log('ok')}})}>alert</button>
        </div>

        <div>
          <button onClick={()=>Modal.confirm({
              text: 'confirm',
              okText: 'ok',
              onOk(){console.log('confirm ok')},
              onCancel(){console.log('取消')},
            })
            }>confirm</button>
        </div>

        <div>
          <button onClick={()=>Modal.prompt({
              text: 'prompt',
              okText: 'ok',
              onOk(val){console.log('prompt:', val)},
              onCancel(){console.log('取消')},
            })
            }>prompt</button>
        </div>

        <div>
          <button onClick={()=>Modal.toast('toast', ()=>console.log('toast'))
            }>toast</button>
        </div>
      </div>

    );
  }
}



ReactDOM.render(<Example/>, document.querySelector('#root'))
