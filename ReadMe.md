#### 一、项目初始化

##### 1 npm 初始化
```
npm init -y
```
生成`pakage.json`文件
##### 2 git 初始化
```
git init 
```
创建  `.gitignore`文件

#### 二、搭建项目
##### 1 安装koa
```
npm i koa
```
##### 2 用koa编写最基本的app
创建  `src/main.js` 文件
```node
const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'hello node-api'
})

app.listen(3000, () => {
  console.log('server is running on localhost:3000 ');
})
```

#### 三、 项目的基础优化
##### 1 自动重启服务
安装 nodemon 工具
```
npm i nodemon -D
```
编写 `pakage.json`脚本
```
"scripts": {
  "dev": "nodemon src/main.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

##### 2 读取配置文件
安装 `dotenv`，读取根目录中的`.env`文件，将配置写入`process.env`中
```
npm i dotenv
```
创建`.env`文件
```
APP_PORT=8000
```
创建`src/config/config.default.js`
```node
const dotenv  = require('dotenv')
dotenv.config()
module.exports = process.env
```
改写main.js
```node
const Koa = require('koa')
const app = new Koa()
const {APP_PORT} = require('./config/config.default')

app.use((ctx, next) => {
  ctx.body = 'hello node-api'
})

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
})```