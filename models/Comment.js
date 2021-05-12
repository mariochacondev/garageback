const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    postedBy:{
        type: Schema.Types.ObjectId, 
        ref: 'User',

    },
    date: {
        type: Date,
        default: Date.now
    },

});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;