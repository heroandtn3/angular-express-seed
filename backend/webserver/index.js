const express = require('express');
const bodyParser = require('body-parser');
const storyRoutes = require('./api/story');

const app = express();

app.use(bodyParser.json());

// allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});


app.use('/', express.static('build'));
app.use('/api/stories', storyRoutes);

function start() {
  app.listen(8080, () => {
    console.log('AB server is listening on port 8080!');
  });
}

module.exports = {
  start,
};
