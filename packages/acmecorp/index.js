const serve = require('koa-static');
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

const loginView = require('./views/login');

const port = process.env.PORT || 5000;

app.use(serve(__dirname + '/public'));

// app.use(async ctx => {
//   ctx.body = loginView();
// });

app.listen(port);
