# f7-modal

样式文件

```js

import 'f7-modal/_build/styles/index.css'

```

## &lt;Modal/&gt;

浮层基础组件,  如有个性化浮层需求可以再Modal基础上扩展

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


```
