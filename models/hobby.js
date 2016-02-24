var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HobbySchema = new Schema({
  name: { type: String, required: 'Name is required!' },
  slug: { type: String, required: 'Slug is required!' },
  imageUrl: String,
  indoor: { type: Boolean, default: false },
  computer: { type: Boolean, default: false },
  practical: { type: Boolean, default: false },
  creative: { type: Boolean, default: false },
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
  }]
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

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

module.exports = mongoose.model('Hobby', HobbySchema);
