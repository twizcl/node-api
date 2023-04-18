> 这是一个渐进式的项目，建议跟着文档，一步一步渐进的实践

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
})
```

#### 四、添加路由
根据不同的请求URL，调用对应的处理函数
##### 1 安装koa-router
```
npm i koa-router
```
使用步骤：
  1. 导入koa-router
  2. 实例化router对象
  3. 编写路由
  4. 注册中间件
##### 2 编写路由
创建`src/router`目录，编写`user.route.js`文件
```node
const Router = require('koa-router')
const router = new Router({prefix: '/users'})

router.get('/',(ctx,next) => {
  ctx.body = 'hi users!!!'
})

module.exports = router
```
##### 3 改写main.js
```node
const Koa = require('koa')
const app = new Koa()
const {APP_PORT} = require('./config/config.default')
const userRouter = require('./router/user.route')

app.use(userRouter.routes())

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
})
```

#### 五、目录结构优化
##### 1 将http服务和app业务拆分
创建 `src/app/index.js`
```node
const Koa = require('koa')
const app = new Koa()

const userRouter = require('../router/user.route')

app.use(userRouter.routes())

module.exports = app
```
改写`main.js`
```node
const {APP_PORT} = require('./config/config.default')
const app = require('./app')

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
})
```
##### 2 将路由和控制器拆分
路由： 解析URL，分布给控制器对应的方法
控制器：处理不同的业务
创建 `src/controller/user.controller.js`
```node
class UserController{
  async register(ctx, next){
    ctx.body = '用户注册成功！'
  }
  async login(ctx, next){
    ctx.body = '用户登陆成功！'
  }
}
module.exports = new UserController()
```
改写`user.route.js`
```node
const Router = require('koa-router')
const router = new Router({prefix: '/user'})

const {register, login} = require('../controller/use.controller')

router.get('/register',register)
router.get('/login',login)

module.exports = router
```