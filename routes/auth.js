const router = require('express').Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');




router.post('/register', async (req, res) => {

    //VALIDATE DATA
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //CHECK IF THE USER IS ALRADY IN DATABASE
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Votre email est déjà registré');

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //CREATE NEW USER
   const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
   });
   try {
    const savedUser = await user.save();
    res.send("Votre Inscription est bien enregistré. <br>  Bonjour " + user.username  + " Bienvenue sur Garage");
   } catch(err) {
    console.log(err);
    res.status(400).send(err);

   }
});

//LOGIN without RefreshToken

// router.post('/login', async (req, res) => {
//     //VALIDATE DATA BEFORE
//     const { error } = loginValidation(req.body)
//     if(error) return res.status(400).send(error.details[0].message);
//         //CHECK IF THE USER IS ALRADY IN DATABASE
//         const user = await User.findOne({email: req.body.email});
//         if(!user) return res.status(400).send('Votre email est ne pas valide');
//         //CHECK IF PASSWORD IS CORRECT
//         const validPass = await bcrypt.compare(req.body.password, user.password);
//         if(!validPass) return res.status(400).send('Mot de passe incorrecte')
//         //CREATE AND ASSING TOKEN
//         const token = jwt.sign({ userId: user._id},  process.env.TOKEN_SECRET);
//         res.header('auth-token', token);
//         res.header('userId', user._id);
//         res.header('username', user.username)
//         res.header('role', user.role)
//         .send({ token:token, userId:user._id, username:user.username, role:user.role })
//     });

module.exports = router;