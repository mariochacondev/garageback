const express = require('express');
const router = express.Router();
const Embed = require('../models/Embed');
const verify = require('../middlewares/verifyToken');
const {verifyRoles} = require('../middlewares/verifyRoles');



//GET EMBED
router.get('/', async (req, res) => {
   try {
    const embed = await Embed.find();
    res.json(embed); 
   } catch(err) {
    res.status(500).send(err);
   }
});


//SUBMIT EMBED
router.post('/', verify, verifyRoles('admin'), async (req, res) => {
    const embed = new Embed({
        musicChart: {
       iFrame: req.body.iFrame,
       genre: req.body.genre
    }
       });
    try {
        const savedEmbed = await embed.save();
        res.json(savedEmbed);
    } catch(err) {
     res.status(500).send(err);
    }
    
});


//DELETE EMBED
router.delete('/:embedId', verify, verifyRoles('admin'), async (req, res) => {
    try {
        const removedEmbed = await Embed.deleteOne({ _id: req.params.embedId });
        res.status(200).json(removedEmbed);
    } catch(err) {
     res.status(500).send(err);
    }

});

module.exports = router;