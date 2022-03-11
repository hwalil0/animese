const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    like: {
        type: Number,
    },
    view: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    categori: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categori",
    }],
    author2: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
