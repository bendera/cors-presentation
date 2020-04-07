const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const YEAR = 24 * 60 * 60 * 1000 * 365;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cors({
  origin: 'http://netbank.localhost',
  credentials: true,
  allowedHeaders: ['X-Custom-Header-Example']
}));
app.use(cookieSession({
  name: 'session',
  keys: ['foo'],
  maxAge: YEAR,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/user', (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

  if (req.body.username === 'admin' && req.body.password === 'admin') {
    req.session.loggedIn = true;
  }

  const loggedIn = req.session.loggedIn || false;

  res.json({
    loggedIn: loggedIn,
  });
});

app.get('/user', (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

  const loggedIn = req.session.loggedIn || false;

  req.session.views = (req.session.views || 0) + 1;

  if (loggedIn) {
    res.json({
      loggedIn,
      username: 'johndoe',
      name: 'john Doe',
      email: 'johndoe@gmailcom',
      accountBalance: '999',
      views: req.session.views,
    });
  } else {
    res.json({
      loggedIn
    });
  }
});

app.get('/logout', (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

  req.session = null;

  res.json({
    loggedIn: false
  });
});

app.options('*', cors());

app.listen(port, () => console.log(`Express server listening on port ${port}!`));
