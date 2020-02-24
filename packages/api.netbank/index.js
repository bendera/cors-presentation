const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/userinfo', (req, res) => {
  res.json({
    username: 'johndoe',
    name: 'john Doe',
    email: 'johndoe@gmailcom',
    accountBalance: '999'
  });
});

app.options('*', cors());

app.listen(port, () => console.log(`Express server listening on port ${port}!`));
