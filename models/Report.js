const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    rwhy: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    video_id: {
        type: String,
        required: true
    },
    video_author_id: {
        type: String,
        required: true
    },
    video_author_name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
});

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;
