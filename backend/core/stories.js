const Story = require('../db').models.Story;

function getStories(limit=20, offset=0) {
  return Story.find({})
    .limit(Number(limit))
    .skip(Number(offset));
}

module.exports = {
  getStories,
};
