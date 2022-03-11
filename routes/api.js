const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const Categori = require('../models/Categori');
const Gif = require('../models/Gif');
const { ObjectID } = require("mongodb");
const mongoose = require('mongoose');
const { route } = require('./api');

router.get('/', (req, res) => {
    res.json('api online')
})

router.get('/gif/random', (req, res) => {
    Gif.find({}).populate('author2').then(gif => {
        const gifs = []
        gif.forEach((anan) => {
            const bgif = {
                gif: anan.img,
                /*author_name: anan.author2[0].name,
                author_avatar: anan.author2[0].avatar,
                gif_url: "http://localhost:5000/page/gif/" + anan._id*/
            }
            gifs.push(bgif);
        })
        res.json(gifs)
    })
})

router.get('/gif/:categori/', (req, res) => {
    Categori.findById(req.params.categori).populate('Gif').then(c => {
        const cgif = []
        c.Gif.forEach((anan) => {
            const gifs = {
                gif: anan.img,
            }
            cgif.push(gifs);
        })
        res.json(cgif)
    })
})


module.exports = router;
