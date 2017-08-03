# f7-modal

浮层基础组件,  如有个性化浮层需求可以再Modal基础上扩展

```jsx
import {Modal, Popup, PickerModal, Popover} from 'f7-modal'
```

popup 实现

```jsx
<Modal type="popup" fixTop={false} {...other}>{children}</Modal>
```

参数:

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| type | string | 默认值:modal |
| visible | bool | 是否显示 |
| closeByOutside | bool | 点击外层关闭 |
| containerCss | string | wrap节点的class |
| afterClose | func | 关闭后回调 |
| fixTop | bool | 是否上下居中 |
| mounter | bool | 是否挂载在组件外部 |
| root | dom | mounter 选择挂载的节点 |
| onCancel | func | 关闭回调 |
| afterClose | func | 关闭后回调 |
| overlay | bool | 是否显示遮罩层 |

## &lt;PickerModal/&gt;

半框浮层

```jsx
<PickerModal
  visible={this.state.pickerModalOpened}
  onCancel={()=>{this.setState({pickerModalOpened: false})}}
>
  <ContentBlock>
    <p>About Popover created dynamically.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac diam ac quam euismod porta vel a nunc. Quisque sodales scelerisque est, at porta justo cursus ac.</p>
  </ContentBlock>
</PickerModal>
```

## &lt;ActionsModal/&gt;

操作浮层

```jsx
const {ActionLabel, ActionButton, ActionGroup} = ActionsModal;

<ActionsModal visible={this.state.actionsOpened} onCancel={()=>{this.setState({actionsOpened: false})}}>
  <ActionGroup>
    <ActionLabel>这是一个标题，可以为一行或者两行。</ActionLabel>
    <ActionButton>示例菜单</ActionButton>
    <ActionButton>示例菜单</ActionButton>
  </ActionGroup>
  <ActionGroup>
    <ActionButton color="red" onClick={()=>{this.setState({actionsOpened: false})}}>取消</ActionButton>
  </ActionGroup>
</ActionsModal>
```

## &lt;Popover/&gt;

提示框

```jsx
<Popover style={{width: 200}} content={(
  <ContentBlock>
    <p>About Popover created dynamically.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac diam ac quam euismod porta vel a nunc. Quisque sodales scelerisque est, at porta justo cursus ac.</p>
  </ContentBlock>
  )}>
  <Button>Popover 2</Button>
</Popover>
```

## &lt;Popup/&gt;

弹窗

```jsx
一般弹窗
<Popup>content</Popup>

弹窗视图
<Popup visible={this.state.popupOpened}>
  <View>
    <Pages path="/" exact component={pop1}></Pages>
    <Pages path="/pop2" component={pop2}></Pages>
    <Pages path="/pop3" component={pop3}></Pages>
  </View>
</Popup>
```

## 对话框

`alert` `confirm` `prompt` `toast`

```js
Modal.alert({
    [title], text, [onOk], [okText='确定']
})

Modal.confirm({
    [title], text, [onOk], [onCancel], [okText='确定'], [cancelText='取消']
})

Modal.prompt({
    [title], text, [onOk], [onCancel], [okText='确定'], [cancelText='取消']
})

Modal.toast({
    text, [timer], [callbackOk]
})

// 更多toast
Modal.toast.sucess({
    text, [timer], [callbackOk]
})
Modal.toast.fail({
    text, [timer], [callbackOk]
})
Modal.toast.warning({
    text, [timer], [callbackOk]
})
Modal.toast.offline({
    text, [timer], [callbackOk]
})

```
