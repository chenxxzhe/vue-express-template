# express vue 模板

## 功能

[] vue 开发环境，ssr
[] 生产环境 routes 里自动生成地址 （需不需要？）
[] 可以引入jq
[] sass
[] 微信项目上线后也可以方便调试
[] axios

难题：1. 开发环境如何跳转网页。


## 目录结构

- bin     运行express app。
- config  存放经常变动的配置，供webpack使用
- public  存放静态资源(js, img, css 等等)，供html引用。由webpack构建时生成。
- routes  路由，写页面路由以及数据api。
- src     vue源码，一个vue文件构建出一个html。
- views   存放页面文件(html)。由webpack构建时生成。
- webpack 存放webpack配置文件。


## 命令

- 开发，运行开发服务器

`npm start`

- 构建，生成最终文件到express对应的文件夹

`npm run build`


## 提示

- 路径简写： @ => /src
