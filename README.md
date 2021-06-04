# vue3-pinia-vite-ant-design-admin

此分支是 vite + Vue3.x + pinia + ant-design 版本

ant-design-vue2.1.2以上版本有bug，所以目前用2.1.2，vue3版本3.0.5

本项目使用Vue3语法糖script setup **[https://github.com/vuejs/rfcs/pull/227](https://github.com/vuejs/rfcs/pull/227)**  
```
<template>
  <Foo :count="count" @click="inc" />
</template>

<script setup>
    import Foo from './Foo.vue'
    import { ref } from 'vue'
    const count = ref(0)
    const inc = () => { count.value++ }
</script>
 
```

## 功能

```

- 权限验证
  - 页面权限

- 完成功能
  - 登陆、退出
  - 动态侧边栏
  - tab标签
  - IconFont 图标
  - Mock 数据
  - eslint 配置

- 项目目录
  - mock
  - public
  - src
    - ant-design
    - api
    - assets
    - components
    - layout
      - layout-content
      - layout-header
      - layout-logo
      - layout-menu
      - layout-tabs
    - router
    - store
      - modules
    - utils
    - views
      - error
      - form
      - index
      - login
      - redirect
      - tables

```



## 项目设置

### 一、Install dependencies

```bash
$ yarn
```

### 二、Compiles and hot-reloads for development

```bash
$ yarn dev
```


### 三、Compiles and minifies for production

```bash
$ yarn build
```


### 五、Lints or fixes files
```
$ yarn elt

# or

$ yarn elt-fix

```

## License

[MIT]() license.

Copyright (c) 2021-present @nmfox.com
