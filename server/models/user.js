const bcrypt = require('bcrypt'); 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema ({
  firstName: String,
  lastName: String,
  isAdmin: Boolean,
  email: String,
  password: String,
},
{
  timestamps: true
})

userSchema.pre('save', function(next) {
  var user = this

  if(user.isModified('password')) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      })
    })
  }
  else {
    next();
  }
})


var User = mongoose.model('User', userSchema)
module.exports = { User, userSchema }

// pw + salt
// salting adds characters to the password every round that it becomes so unrecognizable
// hashing scrambles and encrypts the password
// its like a blackbox
// token signs and secures 
