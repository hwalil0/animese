const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://cdn.discordapp.com/attachments/696099419128332350/779826138641989642/pngtree-user-icon-png-image_1796659.png'
  },
  banner: {
    type: String,
    default: 'https://cdn.discordapp.com/attachments/712249377661648966/761552871832944700/wrw7wllaj1y01.jpg'
  },
  admin: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  password2: {
    type: String,
    required: true
  },
  s_coin: {
    type: String,
    default: '0'
  },
  hakkında: {
    type: String,
    default: 'Edit Your About'
  },
  yas: {
    type: String,
    default: 'Edit Your Age'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  }],
  follow: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Follow",
  }],
  date: {
    type: Date,
    default: Date.now
  },
  video: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
}],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
