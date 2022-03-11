const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const { ObjectID } = require("mongodb");
const mongoose = require('mongoose');
const { route } = require('./users');
const Video = require('../models/Video');
const Categori = require('../models/Categori');
const Gif = require('../models/Gif');
const Follow = require('../models/Follow');
const Report = require('../models/Report');

const moment = require("moment");
const auth = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) =>
  Video.find({ }).sort({"date":-1}).limit(40).populate('author2').then(video => {
    Video.find({}).sort({"view":-1}).limit(40).populate('author2').then(video2 => {
      res.render('welcome', {
        video,
        video2
      })
    })

  })
);
// Dashboard


router.get("/index", ensureAuthenticated, (req, res) => {
  User.findById(req.user._id).then((rUser) => {
    Video.find({}).sort({"date":-1}).limit(40).populate('author2').then(video => {
      Video.find({}).sort({"view":-1}).limit(40).populate('author2').then(video2 => {
        res.render("dashboard",
        {
          video: video,
          video2,
        });
      })

    })
  }).catch((e) => {
    res.send(e);
  });
});

router.get('/profile/@me', ensureAuthenticated, (req, res) => {
  User.findById(req.user._id).then((user) => {
    res.render('profil', {
      user: user,
    })
  })
})

router.get('/edit/@me', ensureAuthenticated, (req, res) => {
  User.findById(req.user._id).then((user) => {
    res.render('himself', {
      user: user,
    })
  })
})

router.post("/edit/@me", ensureAuthenticated, (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body.user).then(() => {
    res.redirect("/profile/@me");
  }).catch((e) => {
    console.log(e);
    return res.redirect("/profile/@me");
  });
});

// upload

router.get('/upload/porn', ensureAuthenticated, (req, res) => {
  Categori.find({}).then(categori => {
    res.render('video/upload', { categori })
  })
})

router.post('/upload/porn', ensureAuthenticated, (req, res) => {
  User.findById(req.user._id).then(user => {
    const anan = req.body.c
    Categori.findOne({ name: anan }).then(categori => {
      const { name, url } = req.body;
      const newporn = new Video({
        author: req.user._id,
        name,
        url,
      })
      newporn
        .save()
        .then(video => {
          categori.video.push(video._id);
          categori.save();
          video.categori.push(categori._id);
          video.author2.push(req.user._id);
          video.save();
          res.redirect('/profile/@me')
        })
    })
  })
})
// upload end

router.get('/video/embed/:id', (req, res) => {
  Video.findById(req.params.id).then(video => {
    res.render('video/embed',
      {
        video
      })
  })
})

router.get('/video/watch/:id', (req, res) => {
  Video.findById(req.params.id).populate('author2').then(video => {
    Video.find({}).populate('author2').then(video2 => {
      
      const v_count = Math.floor(video.view + 1)
      video.view = v_count,
        video.save();
      moment.locale("en")
      const bestdate = moment(video.date).format("DD MMMM YYYY")
      if (!req.isAuthenticated()) {
        res.render('video/notloginpage',
          {
            video,
            bestdate,
            video2,
          })
      } else {
        res.render('video/page',
          {
            video,
            bestdate,
            video2,
            local_user: req.user
          })
      }

    })
  })
})

router.get('/edit/video/:id', ensureAuthenticated, (req, res) => {
  Categori.find({}).then(categori => {
    Video.findById(req.params.id).populate('author2').then(video => {
      const user = req.user
      if (video.author2[0].name == req.user.name) {
        res.render('video/edit',
          {
            v: video,
            categori
          })
      } else {
        res.redirect('/')
      }
    })
  })
})

router.post('/edit/video/:id', ensureAuthenticated, async (req, res) => {
  Video.findById(req.params.id).populate('author2').then(v2 => {
    if( v2.author2[0].name == req.user.name){
      Video.findByIdAndUpdate(req.params.id, req.body.v).then(() => {
        res.redirect("/video/watch/" + req.params.id);
      })
    }else{
      res.redirect('/')
    }

  })




})

router.get('/gifs', (req, res) => {
  Gif.find({}).populate('author2').then(gif => {
    res.render('gif/gifs', { gif })
  })
});

router.get('/upload/gif', ensureAuthenticated, (req, res) => {
  Categori.find({}).then(categori => {
    res.render('gif/addgif', { categori })
  })
});

router.post('/upload/gif', ensureAuthenticated, (req, res) => {
  User.findById(req.user._id).then(user => {
    const anan = req.body.c
    Categori.findOne({ name: anan }).then(categori => {
      const { name, img } = req.body;
      const newgif = new Gif({
        author: req.user._id,
        name,
        img,
      })
      newgif
        .save()
        .then(gif => {
          categori.Gif.push(gif._id);
          categori.save();
          gif.categori.push(categori._id);
          gif.author2.push(req.user._id);
          gif.save();
          res.redirect('/profile/@me')
        })
    })
  })
})

router.get('/page/gif/:id', (req, res) => {
  Gif.findById(req.params.id).populate('author2').then(gif => {
    Gif.find({}).populate('author2').then(gif2 => {
      const v_count = Math.floor(gif.view + 1)
      gif.view = v_count,
        gif.save();
      moment.locale("en")
      const bestdate = moment(gif.date).format("DD MMMM YYYY")
      if (!req.isAuthenticated()) {
        res.render('gif/notloginpage',
          {
            gif,
            bestdate,
            gif2,
          })
      } else {
        res.render('gif/gifpage',
          {
            gif,
            bestdate,
            gif2,
            local_user: req.user
          })
      }
    })
  })
})

router.post('/follow/:id', ensureAuthenticated, (req, res) => {
  User.findById(req.user._id).populate('follow').then(author => {
    const author2 = author.follow
    User.findById(req.params.id).then(user => {
      if (req.user.name == user.name) {
        res.send('self follow ?')

      } else {
        if (req.user.follow.map(z => z._id).includes(user._id)) {
          res.send('already followed')
        } else {
          const follow = new Follow({
            author_id: author._id,
            user_id: user._id,
          })
          follow
            .save()
            .then(anan => {
              anan.author2.push(author._id),
              anan.save()
              author.follow.push(user._id)
              author.save()
              res.end
            })
        }
      }


    })
  })
})


router.post('/report/:id', ensureAuthenticated, (req, res) => {
  Video.findById(req.params.id).populate('author2').then(video => {
    const user = req.user
    const {rwhy,about} = req.body
    const report31 = new Report({
      rwhy,
      about,
      author : user._id,
      video_author_id : video.author2[0]._id,
      video_author_name : video.author2[0].name,
      video_id : video._id,
    })
    report31
      .save()
      .then(report => {
        res.redirect('/video/watch/' + req.params.id)
    })
  })
})

module.exports = router;
