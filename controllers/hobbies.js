var Hobby = require('../models/hobby');
var _ = require('lodash');

var conceptsController = {
  findOne: function(req, res, next) {
    Hobby.findOne({slug: req.params.slug})
    .then(function(hobby) {
      res.json(hobby);
    })
  },
  get: function(req, res, next) {
    Hobby.find({})
    .then(function(hobbies) {
      res.json(hobbies);
    })
  },
  create: function(req, res, next) {
    var newHobby = new Hobby(req.body);
    newHobby.save()
    .then(function(savedHobby) {
      res.json(savedHobby);
    })
  },
  update: function(req, res, next) {
    console.log(Hobby.schema);
    Hobby.findOne({slug: req.params.slug})
    .then(function(hobby) {
      hobby.name = req.body.name
      hobby.public = req.body.public
      hobby.imageUrl = req.body.imageUrl
      hobby.indoor = req.body.indoor
      hobby.computer = req.body.computer
      hobby.practical = req.body.practical
      hobby.creative = req.body.creative
      hobby.difficulty = req.body.difficulty
      hobby.startingCost = req.body.startingCost
      hobby.repeatCost = req.body.repeatCost
      hobby.desc = req.body.desc
      hobby.resources = req.body.resources
      hobby.affiliateLinks = req.body.affiliateLinks
      hobby.videos = req.body.videos
      return hobby.save();
    })
    .then(function(hobby) {
      res.json(hobby);
    })
  },
  patch: function(req, res, next) {
    Hobby.findOne({slug: req.params.slug})
    .then(function(hobby) {
      var mergedHobby = _.merge(hobby.toObject(), req.body);
      _.extend(hobby, mergedHobby);
      return hobby.save();
    })
    .then(function(hobby) {
      res.json(hobby);
    })
  },
  remove: function(req, res, next) {
  }
};

module.exports = conceptsController;
