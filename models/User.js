const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        maxLength: 255,
        minLength: 6
    },
    password: {
        type: String,
        required: true,
        maxLength: 1024,
        minLength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            type: [ Schema.Types.ObjectId ], 
            ref: 'Comment'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;