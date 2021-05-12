const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const verifyToken = require('./verifyToken');
const verfyUserIdPostedBy = require('./verfyUserIdPostedBy')



//GET ALL COMMENTS
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().populate('postedBy', 'username');
        res.json(comments); 
    } catch {
        res.json({message:err})
    }
  })

//GET THE USER comments
router.get('/myComments', verifyToken, async (req, res) => {
    const userId = req.header('userId')
    try {
        const comments = await Comment.find().populate('postedBy', 'username');
        res.json(comments.filter(comment => comment.postedBy.id === userId));
    } catch {
        console.log({message:err}) 
        res.json({message:err})
    }
  })

//SUBMMIT COMMENTS
router.post('/', verifyToken, async (req, res) => {
    const userId = req.header('userId')
    const comment = new Comment({
        message: req.body.message,
        postedBy: userId
       });
    const userUpdate = await User.findOneAndUpdate(
        { _id: userId },
        { $push: {comments: comment} }
        );
   try {
    const savedComment = await comment.save();
    res.json(savedComment);
   } catch(err) {
       console.log(err)
       res.json({message:err});
   }
})

// SPECIFIC COMMENT
router.get('/:commentId', verifyToken, async (req, res) => {
    try {
     const comment = await Comment.findById(req.params.commentId).populate('postedBy');
     res.json(comment);
    } catch(err) {
     res.json({message:err});
    }
 })

// DELETE COMMENT
router.delete('/:commentId', verifyToken, verfyUserIdPostedBy, async (req, res) => {
    try {
        const removedComment = await Comment.deleteOne({ _id: req.params.commentId });
        res.status(200).json(removedComment);
    } catch(err){
        res.json({message:err});
    }
})

//UPATE COMMENT
router.patch('/:commentId', verifyToken, async (req, res) => {
    try {
        const updatedComment = await Comment.updateOne(
            { _id: req.params.commentId },
            { $set: {message: req.body.message }}
            );
        res.json(updatedComment);
    } catch(err){
        res.json({message:err});
    }
});


module.exports = router;