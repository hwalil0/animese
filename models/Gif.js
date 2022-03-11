const mongoose = require('mongoose');

const GifSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    categori: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categori",
    }],
    author: {
        type: String,
        required: true
    },
    author2: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    date: {
        type: Date,
        default: Date.now
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
});

const Gif = mongoose.model('Gif', GifSchema);

module.exports = Gif;
