var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HobbySchema = new Schema({
  name: String,
  slug: String,
  imageUrl: String,
  indoor: { type: Boolean, default: false },
  computer: { type: Boolean, default: false },
  practical: { type: Boolean, default: false },
  creative: { type: Boolean, default: false },
  difficulty: Number,
  startingCost: [],
  desc: String,
  resources: [{
    ref: String,
    text: String
  }],
  affiliateLinks: [{
    ref: String,
    text: String
  }]
});

module.exports = mongoose.model('Hobby', HobbySchema);
