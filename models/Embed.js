const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}




const embedSchema = mongoose.Schema({
    musicChart: {
        iFrame: reqString,
        genre: reqString 
    }

});

const Embed = mongoose.model('Embed', embedSchema);

module.exports = Embed;