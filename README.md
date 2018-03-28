# express vue 模板

## 功能

- [] vue 开发环境，ssr
- [] 生产环境 routes 里自动生成地址 （需不需要？）
- [] 可以引入不在npm的库
- [] 微信项目上线后也可以方便调试
- [] 移动端项目，手机调试console
- [x] sass
- [x] axios

## 目录结构

- bin     运行express app。
- config  存放经常变动的配置，供webpack使用
- public  存放静态资源(js, img, css 等等)，供html引用。由webpack构建时生成。
- routes  路由，写页面路由以及数据api。
- src     vue源码
  - api     写数据接口
  - assets  资源文件放这里
  - pages   页面文件放这里，每个页面一个文件夹，文件夹名作为html文件名；一定要有一个index.js作为入口
  - styles  写全局样式与全局变量
  - util    工具库
  - common-entry.js   各个page的入口都要引入
  - index.html        各个page的模板
- views   存放页面文件(html)。由webpack构建时生成。
- webpack 存放webpack配置文件。


## 命令

- 开发，运行开发服务器

`npm start`

- 构建，生成最终文件到express对应的文件夹

`npm run build`


## 提示

- 路径简写： @ => /src
