const mongoose = require('mongoose');

const CategoriSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    video: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
    }],
    Gif: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gif",
    }],
});

const Categori = mongoose.model('Categori', CategoriSchema);

module.exports = Categori;
