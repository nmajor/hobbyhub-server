var Hobby = require('../models/hobby');

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
