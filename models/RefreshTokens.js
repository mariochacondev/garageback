const mongoose = require('mongoose');

const RefreshTokensSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        minLength:3,
        maxLength: 1080,
    }
    
});

const RefreshTokens = mongoose.model('RefreshTokens', RefreshTokensSchema);

module.exports = RefreshTokens;