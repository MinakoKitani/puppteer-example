# 用puppeteer练手

## 12/31使用puppeteer对wps官网进行截图并保存到本地

- 执行命令 `yarn run start`
- 注意保存路径
- 执行滑动操作代码参考 [https://blog.csdn.net/ASAS1314/article/details/81633423]()

## 1/5使用puppeteer对wps官网生成pdf并保存到本地

### 一开始单纯使用`await page.pdf({path: --})`的问题：

- 要等很久
- 生成的pdf是全屏的
- 没有指定宽度是默认的
- 只能在无头模式下执行
- pdf的css样式颜色是没有的
- 没有背景图
- 没点击同意cokkie
- 没有慢慢滑动，有些图片还没加载出来

### 修改后仍有
- 把css的样式加上渲染之后，时间越来越久..到了快90s了
- 首屏的图片是一整块的
- 每张pdf都会有顶部栏，因为网站设置顶部栏固定的缘故？设置生成的pdf的高度应该就好了
- 页面的视频是黑的一片

### 突然发现..顶部导航栏把移动端的也渲染出来了，也就是生成的pdf是有两套顶部导航栏同时存在的,而且网上说的在head里面的link加载不出来的问题好像也没有出现.

### 怎么越来越离谱..执行到后面的时候去掉渲染上css颜色的选项后还是给渲染上了..

### !!!芜湖,需要在生成pdf之前改变页面的css媒体类型,不然默认css媒体类型是print类型

## 1/10使用puppeteer在谷歌浏览器输入周杰伦并截图搜索结果

- 对键盘的操作需要用到 `page` 下面的 `keyboard` 类来进行操作
- 类选择器选择多个类的时候 `.class1.class2` 这样进行选择
- 截图是执行的path没有类型后缀但是又制定了截图类型也没有，最终保存下来的也是没有后缀名的。同时，path如果指定了后缀名的时候再指定type的时候也没用，是按path的后缀名为准的。

## 1/11使用puppeteer在谷歌浏览器的图片搜索中上传本地图片截图搜索结果