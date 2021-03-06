const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send({message:'Acces Denied, You need to Sing In'});

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        console.log(err)
        res.status(401).send({message:'Invalid Token'})
    }
}


