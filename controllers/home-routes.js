const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment,  } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('homepage', { posts });
      res.render('search', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

/*router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/search', (req, res) => {
  if (req.session.loggedIn) {
  
  res.render('search');
  } else res.render('login')
});

*/

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.render('search');
  } else res.render('login')
  
});

module.exports = router;
