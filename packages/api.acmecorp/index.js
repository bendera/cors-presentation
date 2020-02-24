const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 5001;

app.keys = ['asdfghjk'];

const CONFIG = {
  maxAge: 86400000,
}

app.use(bodyParser());
app.use(session(CONFIG, app));
app.use(cors({
  origin: '*',
  credentials: true
}));

const secretInfo = {
  name: 'John Doe',
  accountBalance: '2980000',
  email: 'johndoe@example.com'
};

router
  .get('/', (ctx, next) => {
    const loggedIn = ctx.session.loggedIn || false;

    if (loggedIn) {
      ctx.body = {
        loggedIn: loggedIn,
        ...secretInfo
      };
    } else {
      ctx.body = {
        loggedIn: loggedIn,
        name: 'Anonymus',
      };
    }
  })
  .post('/login', (ctx, next) => {
    const { name, password } = ctx.request.body;
    const loggedIn = name === 'admin' && password === 'admin';

    ctx.session.loggedIn = loggedIn;
    ctx.body = {
      'loggedIn': loggedIn
    };
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port);
