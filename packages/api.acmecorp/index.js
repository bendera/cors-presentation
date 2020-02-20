const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session');

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 5001;

app.keys = ['asdfghjk'];

const CONFIG = {
  maxAge: 86400000,
}

app.use(session(CONFIG, app));

router.get('/', (ctx, next) => {
  // ctx.response.set('Access-Control-Allow-Origin', '*');
  // ctx.response.set('Access-Control-Allow-Credentials', true);

  let n = ctx.session.views || 0;

  ctx.session.views = ++n;

  ctx.body = {
    message: 'hello',
    views: n,
  };
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port);
