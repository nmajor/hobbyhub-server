var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.get('/user', function(req, res) {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401);
    res.json({error: {message: "User not logged in."}});
  }
});

router.post('/register', function(req, res) {
  User.register(new User({ email : req.body.email }), req.body.password, function(err, user) {
    if (err) {
      return res.json({error: {
          message: err.message,
          error: err
        }});
    }

    passport.authenticate('local')(req, res, function () {
      res.json(user);
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.json(req.user);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.json({});
});

router.get('/health', function(req, res) {
  res.send('OK');
});

module.exports = router;
