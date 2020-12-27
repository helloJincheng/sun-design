---
title: password - 密码框组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Feedback
  path: /feedback
---

# NumberKeyboard 密码框组件

## 效果演示

### 1. 基本

```tsx | pure
  <Text>基本:</Text>
  <WhiteSpace />
  <Password onDone={onDone} />
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="密码框组件 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963546617636014.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="密码框组件 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963546640839765.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 2. 显示光标

```tsx | pure
  <Text>显示光标:</Text>
  <WhiteSpace />
  <Password onDone={onDone} showCursor />
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="显示光标 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963546603881375.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="显示光标 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963547599574618.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 3. 基本弹窗

```tsx | pure
  <Text>弹窗:</Text>
  <WhiteSpace />
  <Button
    title="modal"
    onPress={() => {
      Password.modal({ title: '仿支付宝支付', onDone: onDone });
    }}
  />
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="基本弹窗 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963546615332497.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="基本弹窗 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963546602684204.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 4. 弹窗显示光标

```tsx | pure
  <Text>弹窗显示光标:</Text>
  <WhiteSpace />
  <Button
    title="modal"
    onPress={() => {
      Password.modal({ title: '仿支付宝支付', onDone: onDone, showCursor: true });
    }}
  />
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="弹窗显示光标 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963548250977751.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="弹窗显示光标 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963548456960405.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>
## API

### password 组件

| 属性       | 必填  | 说明                 | 类型                       | 默认值 |
| ---------- | ----- | -------------------- | -------------------------- | ------ |
| length     | false | 密码框长度           | number                     | 6      |
| onDone     | false | 按键完成事件回调事件 | (password: string) => void | 无     |
| clean      | false | 是否清除             | boolean                    | true   |
| onChange   | false | 密码改变事件回调事件 | (password: string) => void | 无     |
| showCursor | false | 是否显示光标         | boolean                    | false  |
| ref        | false | 获取 input 的 ref    | PasswordInputRef           | false  |

### PasswordInputRef

| 属性  | 说明              | 类型       |
| ----- | ----------------- | ---------- |
| show  | 显示键盘          | () => void |
| hide  | 隐藏键盘          | () => void |
| clean | 清除 imput 的输入 | () => void |

### passwordModal 组件

| 属性       | 必填  | 说明                 | 类型                       | 默认值 |
| ---------- | ----- | -------------------- | -------------------------- | ------ |
| title      | false | 密码框标题           | string                     | 无     |
| length     | false | 密码框长度           | number                     | 6      |
| onChange   | false | 密码改变事件回调事件 | (password: string) => void | 无     |
| showCursor | false | 是否显示光标         | boolean                    | false  |