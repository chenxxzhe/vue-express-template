## 开发环境整合 webpack-dev-server 与 express

webpack-dev-server 作为静态资源服务器
express 作为数据服务器

访问express的地址，获取静态资源走webpack，获取数据走express

## 使用 prerender-spa-plugin 预渲染 vue

[官方github](https://github.com/chrisvfritz/prerender-spa-plugin)

#### 过程
1. 正常打包出 html
2. prerender 访问生成的 html 进行渲染；注意如果有发请求获取数据，要代理
3. 保存生成好的 html

#### 注意点：
[坑点](https://github.com/chrisvfritz/prerender-spa-plugin#caveats)

1. 根组件的 wrapper id 要与 html 上的 wrapper id 相同

例如：
```html
<body>
  <div id="app"></div>
</body>

// app.vue
<template>
  <div id="app"></div>
</template>
```
因为预渲染时会消耗掉第一个 id，生成初始的html，如果需要后续的交互，那么app.vue 里也需要一个 id 供 vue 创建实例

2. 多页应用，一个 plugin 对应一个 html，注意生成的 html 都是 index.html 会覆盖，需要不同文件夹

#### 例子

```js
// webpack plugins

new PrerenderPlugin({
  // 生成 html 的文件夹
  staticDir: '/absolute/path',
  // 需要访问的 html 文件名
  indexPath: 'xxx.html',
  // 渲染后输出 html 的文件夹，暂时只能输出 index.html，不能改名字
  // 由于不能改名字，可以先输出到缓存文件夹，再用 copy-webpack-plugin 改名
  outputDir: '/output/dir',
  // 需要渲染的路由
  routes: ['/'],
  // html文件压缩
  minify: {
    minifyCSS: true,
    removeComments: true,
  },
  // 渲染器
  renderer: new Renderer({
    // 多个触发条件的话第一个才有效
    // 触发渲染的时间，用于获取数据后再保存渲染结果
    renderAfterTime: 5000,
    // 触发渲染的事件， document.dispatch(new Event('vue-mounted'))
    // renderAfterDocumentEvent: 'vue-mounted',
    // 触发渲染的元素，该元素生成后就保存渲染结果
    // renderAfterElementExists: '#app',
    // 是否打开浏览器，false 是打开。可用于 debug 检查渲染结果
    // headless: false,
  }),
  server: {
    // 代理，用于发送请求，设置与 webpack-dev-server 并不完全相同
    proxy: {
      '/api': {
        target: 'http://localhost:' + config.prod.port || 3050,
        pathRewrite: {
          '^/api': '/',
        },
      },
      // proxy的属性用于express: app.use(key, proxy[key])
      // '/:foo': { target }, 可以不匹配 '/'
    },
  },
})

```

