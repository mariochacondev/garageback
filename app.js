const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//IMPORT ROUTES
const commentsRoute = require('./routes/comments');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const embedRoute = require('./routes/embed');

//MIDDLEWARED
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//ROUTE MIDDLEWARE
app.use('/user', authRoute);
app.use('/comments', commentsRoute);
app.use('/adminusers', usersRoute);
app.use('/embed', embedRoute);



//CONNECT TO DB

mongoose.connect(process.env.DB_CONNECTION,  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => 
    console.log('connected to db'));


//LISTEN
app.listen(3000);


