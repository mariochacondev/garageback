const express = require ('express');
const app = express();
const User = require('./models/User');
const RefreshTokens = require('./models/RefreshTokens');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { loginValidation, registerValidation } = require('./validation');
require('dotenv/config');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// REFRESH TOKEN

app.post('/token', (req, res) => {
    const refreshToken = req.header('refresh-token');
    if(refreshToken === null ) return res.sendStatus(401)
    if(!RefreshTokens.findOne(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
        if (err) return res.sendStatus(403)
        const token = generateAccesToken({ username: user.username})
        res.header('auth-token', token)
        res.json({ token: token })
    })
})

//LOGOUT


app.delete('/logout', async (req, res) => {
    const refreshToken = req.header('refresh-token')
    try {
    const deletedTokens = await RefreshTokens.deleteOne({ token: refreshToken });
    res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.json({message:err});
    }
})

//REGISTER 

app.post('/register', async (req, res) => {

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

//LOGIN

app.post('/login', async (req, res) => {
    //VALIDATE DATA BEFORE
    const { error } = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
        //CHECK IF THE USER IS ALRADY IN DATABASE
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Votre email est ne pas valide');
        //CHECK IF PASSWORD IS CORRECT
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Mot de passe incorrecte')
        //CREATE AND ASSING TOKEN
        const token = generateAccesToken(user)
        const accessToken = jwt.sign({ userId: user._id},  process.env.REFRESH_TOKEN_SECRET)
        const tokenRefresh = await new RefreshTokens({ 
            name: user.username,
            token: accessToken
        })
        await tokenRefresh.save();
        res.header('auth-token', token)
        res.header('refresh-token', accessToken)
        res.header('userId', user._id)
        res.header('username', user.username)
        res.header('role', user.role)
        .send({ token:token, userId:user._id, username:user.username, role:user.role, refreshToken:accessToken })
    })

    function generateAccesToken(user){
       return jwt.sign({ userId: user._id},  process.env.TOKEN_SECRET, {expiresIn: '10m'})
    }


    mongoose.connect(process.env.DB_CONNECTION,  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => 
    console.log('connected to db'));




//LISTEN
app.listen(4000);