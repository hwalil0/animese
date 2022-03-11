const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    like: {
        type: Number,
    },
    video: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
    }],
    author: {
        type: String,
        required: true
    },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
