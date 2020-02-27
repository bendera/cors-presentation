const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.options('*', cors());

app.listen(port, () => console.log(`Express server listening on port ${port}!`));
