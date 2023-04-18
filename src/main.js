const Koa = require('koa')
const app = new Koa()
const {APP_PORT} = require('./config/config.default')

app.use((ctx, next) => {
  ctx.body = 'hello node-api'
})

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
})