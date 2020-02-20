const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 5001;

router.get('/', (ctx, next) => {
  ctx.body = {
    message: 'hello'
  };
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port);
