const mongoose = require('mongoose');



const embedSchema = mongoose.Schema({
    iFrame:{
        type: String,
        required: true
    },

});

const Embed = mongoose.model('Embed', embedSchema);

module.exports = Embed;