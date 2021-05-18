module.exports.verifyRoles = function(...permittedRoles) {
        // return a middleware
        return (request, response, next) => {
          const user = request.header('role')
          if (user && permittedRoles.includes(user)) {
            next(); // role is allowed, so continue on the next middleware
          } else {
            response.status(401).json({message: "Forbidden"}); // user is forbidden
          }
        }
      }
