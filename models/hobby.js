var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

var HobbySchema = new Schema({
  name: { type: String, required: 'Name is required!' },
  slug: { type: String, required: 'Slug is required!' },
  public: { type: Boolean, default: false },
  imageUrl: String,
  indoor: { type: Boolean, default: false },
  computer: { type: Boolean, default: false },
  practical: { type: Boolean, default: false },
  artistic: { type: Boolean, default: false },
  difficulty: Number,
  startingCost: [],
  repeatCost: [],
  desc: { type: String, required: 'Description is required!' },
  resources: [{
    ref: String,
    text: String
  }],
  affiliateLinks: [{
    ref: String,
    text: String
  }],
  videos: [{
    src: String,
    text: String
  }],
},{
  timestamps: true
});

HobbySchema.post( 'init', function() {
  this._original = this.toObject();
});

HobbySchema.pre('validate', function(next) {
  if (this.isNew || this.name !== this._original.name) {
    this.slug = slugify(this.name);
  }

  next();
});

HobbySchema.methods.propChanged = function(propsString) {
  var original = this._original || {};
  var current = this.toObject();

  var originalProp = _.get(original, propsString);
  var currentProp = _.get(current, propsString);

  return !_.isEqual(originalProp, currentProp);
},

module.exports = mongoose.model('Hobby', HobbySchema);
