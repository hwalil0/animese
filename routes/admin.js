const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const Categori = require('../models/Categori');
const   { ObjectID } = require("mongodb");
const mongoose = require('mongoose');
const { route } = require('./users');

router.get('/', ensureAuthenticated, (req,res) => {
  if(req.user.admin == true)
  {
    res.render('admin/admin')
  }else{
    res.redirect('/index')
  }
})

router.get('/categori', ensureAuthenticated, (req,res) => {
    if(req.user.admin == true)
    {
      Categori.find({}).then(categori => {
        res.render('admin/categori',
        {
          categori
        })

      })
    }else{
      res.redirect('/index')
    }
})

router.post('/add/categori', ensureAuthenticated, (req,res) => {
  if(req.user.admin == true)
  {
    Categori.create(req.body)
    res.redirect('/admin/categori')
  }else{
    res.redirect('/index')
  }
})

router.get('/delete/categori/:id', ensureAuthenticated, async (req, res) => {
  if(req.user.admin == true)
  {
    await Categori.findByIdAndDelete(req.params.id)
    res.redirect(`/admin/categori`)
  }else{
    res.redirect('/index')
  }
})

router.get('/edit/categori/:id', ensureAuthenticated, async (req, res) => {
  if(req.user.admin == true)
  {
    Categori.findById(req.params.id).then(categori => {
      res.render('admin/cedit', {
        c : categori
      })
    })
  }else{
    res.redirect('/index')
  }
})
router.post('/edit/categori/:id', ensureAuthenticated, async (req, res) => {
  if(req.user.admin == true)
  {
    Categori.findByIdAndUpdate(req.params.id, req.body.c).then(() => {
      res.redirect("/admin/categori");
    })
  }else{
    res.redirect('/index')
  }
})

router.get('/report', ensureAuthenticated, (req,res) => {
    if(req.user.admin == true)
    {
      res.render('panel')
    }else{
      res.redirect('/index')
    }
})

router.get('/users', ensureAuthenticated, (req,res) => {
    if(req.user.admin == true)
    {
      res.render('panel')
    }else{
      res.redirect('/index')
    }
})

module.exports = router;
