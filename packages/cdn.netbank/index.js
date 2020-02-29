const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('*', cors({
  origin: '*'
}))

app.options('*', cors());

app.listen(port, () => console.log(`Express server listening on port ${port}!`));
