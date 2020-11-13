const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
  title: { type: String },
  body: { type: String, required: [true, 'field is required'] },
  date: { type: String, required: true },
  selfImprovements: { type: String },
  imGratefulFor: { type: String },
  whatsBoderingMe: { type: String },
  howToResolveIt: { type: String },
  tomorrowIWantTo: { type: String },
  howIFeltToday: { type: String },
  imageUrl: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Post = mongoose.model('Post', PostsSchema);

module.exports = Post;
