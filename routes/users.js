const router = require('express').Router();
const User = require('../models/User');
const verify = require('./verifyToken');
const {verifyRoles} = require('./verifyRoles');


router.get('/user', verify, verifyRoles('admin'), async (req, res) => {
    try {
        const users = await User.find().populate('comments',  'message');
        res.json(users); 
    } catch {
        res.json({message:err})
    }
})

// SPECIFIC COMMENT
router.get('/:userId', verify, verifyRoles('admin'), async (req, res) => {
    try {
     const user = await User.findById(req.params.userId).populate('comments','message');
     res.json(user);
    } catch(err) {
     res.json({message:err});
    }
})

module.exports = router;