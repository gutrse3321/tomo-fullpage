# tomo-fullpage
一个全屏滚动的插件。使用ES6与部分ESLint规范。重新创建个仓库来完善。
原先写的是在这：[单页全屏滚动](https://github.com/gutrse3321/my-front-practice/tree/master/tomo-fullpage)
## 参数
| 参数       | 说明  |
| --------   | -----|
| mainEl     | 包含需要显示滚动的页面,接收一个DOM对象                           |
| listEL     | 如果需要显示点击移动到指定页面,此容器包含点击子项,接收一个DOM对象 |
| speed      | 移动一个页面需要的时间(速度),接收 `0.3s` 类型的字符串|
| transverse | 是否为横向移动，接收布尔类型 `true` `false`,默认值为`false`|
| wait       | 延时多久开始移动下一页,目前使用毫秒,接收类似`1000`|
## 安装&使用
### 安装
``` bash
# 引入到HTML文件中即可
<script src="tomofullpage.js"></script>
```
### 使用
``` javascript
// 在插件下方使用
let MainContainer = document.querySelector('.MainContainer')
let ListContainer = document.querySelector('.ListContainer')
new TomoFullPage({
  mainEl: MainContainer,
  // listEL: ListContainer,
  speed: '.5s',
  transverse: false, // 或者不写此属性
  wait: 100
})
```
## TODO
- [x] 普通的滚轮滚动<br>
- [ ] 横向滚动<br>
- [x] 手机滑动事件(待优化)<br>
- [ ] <del>鼠标拖动(无意义)</del><br>
- [x] 键盘事件(待优化)<br>
- [ ] NPM包<br>