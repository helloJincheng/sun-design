---
title: Icon - 图标组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Display
  path: /display
---

# Icon 图标组件

## 效果演示

### 1. type 默认

```jsx | pure
<Icon name="user" size={40} />
<WhiteSpace />
<Icon name="user" color="green" bgColor="red" size={40} rounded disabled ratio={2} />
<WhiteSpace />
<Icon
  name="user"
  bgColor="gold"
  color="red"
  rounded={false}
  size={40}
  ratio={2}
  onPress={() => {
    console.log(222);
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607581939572658465.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 2. type="ionicon"

```jsx | pure
<Icon type="ionicon" name="aperture" size={40} />
<WhiteSpace />
<Icon type="ionicon" name="aperture" color="green" bgColor="red" size={40} rounded disabled ratio={2} />
<WhiteSpace />
<Icon
  type="ionicon"
  name="aperture"
  bgColor="gold"
  color="red"
  rounded={false}
  size={40}
  ratio={2}
  onPress={() => {
    console.log(222);
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607582087329555418.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 3. type="custom"

```jsx | pure
<Icon type="custom" name="tab_home_sel" size={40} />
<WhiteSpace />
<Icon type="custom" name="tab_home_sel" color="green" bgColor="red" size={40} rounded disabled ratio={2} />
<WhiteSpace />
<Icon
  type="custom"
  name="tab_home_sel"
  bgColor="gold"
  color="red"
  rounded={false}
  size={40}
  ratio={2}
  onPress={() => {
    console.log(222);
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607582193230531572.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

## API

| 属性        | 必填    | 说明                     | 类型         | 默认值        |
| ----------- | ------- | ------------------------ | ------------ | ------------- |
| name        | `true`  | 图标名                   | `string`     |               |
| size        | `false` | 图标大小                 | `number`     | `16`          |
| color       | `false` | 图标颜色                 | `string`     | `#333`        |
| bgColor     | `false` | 图标的背景色             | `string`     | `transparent` |
| type        | `false` | 图标的类型               | `IconType`   | `ant-design`  |
| onPress     | `false` | 图标点击事件             | `() => void` |               |
| onLongPress | `false` | 图标长按事件             | `() => void` |               |
| disabled    | `false` | 是否禁用                 | `boolean`    | `false`       |
| rounded     | `false` | 图标是否显示成圆形       | `boolean`    | `false`       |
| ratio       | `false` | 图标容器和图标的大小比例 | `number`     | `1.5`         |

1. _`name`可以从 [https://oblador.github.io/react-native-vector-icons/](https://oblador.github.io/react-native-vector-icons/) 查找和复制_

2. _`IconType`枚举值如下_

```jsx|pure
type IconType =
  | 'zocial'
  | 'octicon'
  | 'material'
  | 'material-community'
  | 'ionicon'
  | 'foundation'
  | 'evilicon'
  | 'entypo'
  | 'font-awesome'
  | 'simple-line-icon'
  | 'feather'
  | 'ant-design'
  | 'fontisto'
  | 'custom';
```

## 接入自定义图标

### 1. 定义`Iconfont`组件

```jsx|pure
import { createIconSet } from 'react-native-vector-icons';
import glyphMap from './iconfont.json';

const Iconfont = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default Iconfont;
```

`iconfont.json`这个文件里面的内容是一个 json 对象，key 值是 iconfont.ttf 文件里的图标的名字，value 是图标的 16 进制值。示例如下：

```json
{
  "tab_home_sel": 59072,
  "tab_home_non": 59071,
  "tab_mall_sel": 59070,
  "tab_mall_non": 59069,
  "tab_hotel_non": 59074,
  "tab_hotel_sel": 59075
}
```

### 2. 在项目中引入图标的字体文件

### 3. 在你的项目的`app.tsx`里加入以下代码：

```jsx|pure
import { helpers } from '@td-design/react-native';
//其他import

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);

const App = () => {
  // your code ...
};
```