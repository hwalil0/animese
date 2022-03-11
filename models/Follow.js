const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({

    author2: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    author_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Follow = mongoose.model('Follow', FollowSchema);

module.exports = Follow;
