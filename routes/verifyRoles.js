const User = require('../models/User');


// function findRole(userId){
//     let getUser = User.find({user:userId}).exec();
//     return getUser;
//  }
// var userId
// module.exports = { 
//     verfyRoles: function (req, res, next) {
//         userId = req.header('userId')
//         getUser = findRole(userId);
//         getUser.then(function(users){
//             users.forEach(function(user){
//                console.log(user.role);
//             const role = user.role
//             console.log(role);
//             console.log(userId);
//             if(role !== 'admin') res.status(400).send({message:error})
//             });
//             next();
//          })
//         // role = User.find({ role: req.userId }).exec( function (error, body) {
//         //     if (error) throw new Error(error);
//         //     req.role = body.role
//         // });      
//   },
// }


module.exports.verifyRoles = function(...permittedRoles) {
        // return a middleware
        return (request, response, next) => {
          const  user  = request.header('role')
          console.log(user);
          if (user && permittedRoles.includes(user)) {
            next(); // role is allowed, so continue on the next middleware
          } else {
            response.status(403).json({message: "Forbidden"}); // user is forbidden
          }
        }
      }
