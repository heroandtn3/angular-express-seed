const storyModule = require('../../../core/stories');

function getStories(req, res) {
  const limit = req.query.limit;
  const offset = req.query.offset;

  storyModule.getStories(limit, offset)
    .then((stories) => {
      res.status(200).json(stories);
    }, (err) => {
      console.log('Error while getting stories', err);
      res.status(500).end();
    });
}

module.exports = {
  getStories,
};
