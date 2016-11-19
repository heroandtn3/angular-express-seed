const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
  title: String,
  author: String,
  url: String
});

module.exports = mongoose.model('Story', storySchema);
