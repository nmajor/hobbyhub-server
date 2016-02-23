var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    email: String,
    password: String,
    compilations : [{ type: Schema.Types.ObjectId, ref: 'Compilation' }],
    credentials: [{ type: Schema.Types.ObjectId, ref: 'Compilation' }],
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

module.exports = mongoose.model('User', UserSchema);
