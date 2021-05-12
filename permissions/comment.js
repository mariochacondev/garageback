const { ROLE } = require('../dataUser');
const User = require('../models/User');
const Comment = require('../models/Comment');



function updateUser(req, res, next){
    const updateUser = User.updateOne( { userId: req.header('_id') }, { $set: [{comments: req.body.comments}]} );
    if(userId) return updateUser
    next();
}

function scopedComments(userId, comments) {
    req.header('_id')
    if (user.role == admin ) return comments
    return comments.filter(comment => comment.userId === user.id) 
}

// function canDeleteComment(req, res, next){
//     const userId = req.header('userId')
//     const posted = res.data('postedBy')
//     if(userId !== posted) return res.status(400).send('Cant delete comment from other users');
//     else next();
// }

 
// function canDeleteComment (req, res, next){
//     const userId = req.headers('userId');
//     const posted = req.body(postedBy._id);
//     if(userId != posted ) return res.status(401).send('Cant delete comments from other users');
//     else next();  
// }

// const canDeleteComment = () => {
//     return (req, res, next) => {
//         const userId = req.header('userId');
//         const posted = Comment.findById(req.params.commentId).populate('postedBy','_id');
//         console.log(posted);
//       if ( userId != posted ) {
//           res.status(400).send('Cant delete other users comments')
//       } else {
//         next()
//       }
//     }
//   }

function canDeleteComment(user, comment) {
  return comment.postedBy === user._id
}
  



module.exports = {
    scopedComments,
    updateUser,
    canDeleteComment,
}