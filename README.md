### Usage



2
This is a project template for [vue-cli](https://github.com/vuejs/vue-cli).

## Install

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8088
npm run dev

# build for production with minification
npm run build

```
# PC端
入口1 [http://localhost:8080/pc/entry1/index.html][1]

入口2 [http://localhost:8080/pc/entry2/index.html][2]

# APP端
入口1 [http://localhost:8080/app/entry/index.html][1]
可扩展入口

## 项目文件结构如下
```
    webpack
      |---build 构建文件
      |---config 构建配置
      |---dist 发布目录
      |---static 静态资源虚拟路径
      |---mock 模拟数据
      |---src
        |---api axios请求
        |---assets 资源
        |---common 公共js资源目录
        |---styles 公共样式文件
        |---components 顶级公共组件
          |---组件list
        |---route 路由
        |---vues 全局状态管理
        |---modules 各个模块
          |---pc    PC端
            |---entry1   入口1
              |---components         入口1相关组件
              |---views              入口1相关页面
              |---index.html
              |---index.js           入口1相关配置
              |---App.vue
            |---entry2   入口2
              |---components         入口2相关组件
              |---views              入口2相关页面
              |---index.html
              |---index.js           入口2相关配置
              |---App.vue
            |---同上省略其他模块，请形象命名，不宜太长。
          |---app       app端
  ```

### Browser Support

Modern browsers and Internet Explorer 10+.

### UI Library
// "element-ui": "^1.1.6",
// "iview": "^2.0.0-rc.13",
// "weui": "^1.1.2",

### License
[MIT](http://opensource.org/licenses/MIT)
