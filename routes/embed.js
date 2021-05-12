const express = require('express');
const router = require('express').Router();
const Embed = require('../models/Embed');




router.get('/', async (req, res) => {

   try {
    
   } catch(err) {
    res.status(400).send(err);
   }
});

router.post('/', async (req, res) => {


    try {
    
    } catch(err) {
     res.status(400).send(err);
    }
    
});

router.delete('/:embedId', async (req, res) => {

    try {
    
    } catch(err) {
     res.status(400).send(err);
    }

});

module.exports = router;