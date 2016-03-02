var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

var HobbiesController = require('../controllers/hobbies');

require('node-jsx').install({extension: '.jsx'})

var React = require('react');
var renderToString = require('react-dom/server').renderToString;
var match = require('react-router').match;
var RoutingContext = require('react-router').RoutingContext;

var routes = React.createFactory(require('../client/src/routes'));

router.get('/', function(req, res){
  match({ routes, location: req.url }, function(error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.status(200).send(renderToString(React.createFactory(RoutingContext, {props: renderProps})))
    } else {
      res.status(404).send('Not found')
    }
  });

  // // React.renderToString takes your component and generates the markup
  // var reactHtml = ReactDOMServer.renderToString(ReactApp);
  // // var reactHtml = React.renderToString(ReactApp({}));
  // console.log('blah2');
  // console.log(reactHtml);
  //
  // // Output html rendered by react into .ejs file. Can be any template
  // res.render('index.ejs', {reactOutput: reactHtml});
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('User is authenticated.');
    return next();
  } else {
    res.status(401);
    res.json({error: { message: "Unauthorized. User may not be logged in." }})
  }
}

router.get('/user', function(req, res) {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401);
    res.json({error: {message: "User not logged in."}});
  }
});

router.get('/users', ensureAuthenticated, function(req, res) {
  User.find({})
  .then(function(users) {
    users = users || [];
    res.json(users);
  })
});

router.post('/register', ensureAuthenticated, function(req, res) {
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

router.get('/hobbies', HobbiesController.get);
router.get('/hobbies/all', ensureAuthenticated, HobbiesController.getAll);
router.get('/hobbies/:slug', HobbiesController.findOne);
router.post('/hobbies', ensureAuthenticated, HobbiesController.create);
router.put('/hobbies/:slug', ensureAuthenticated, HobbiesController.update);
router.patch('/hobbies/:slug', ensureAuthenticated, HobbiesController.patch);

module.exports = router;
