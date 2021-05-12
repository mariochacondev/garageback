const Comment = require('../models/Comment');


module.exports.verfyUserIdPostedBy = async function (req, res, next) {
      userId = req.header('userId')
      postedById = await Comment.findById({ _id: req.params.commentId});
      if(userId == postedById.postedBy._id.toString()) {
        next() // role is allowed, so continue on the next middleware 
        return
      }
        res.send('Forbidden')
    
      
}
