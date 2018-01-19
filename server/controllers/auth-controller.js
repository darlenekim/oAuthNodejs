const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function login (req, res) {
//1. GET THE BODY
var email = req.body.email;
var password = req.body.password;
if (!email || !password){
  res.status(400).json({errorMessage: "Email and pass must be set"})
}
else {
  //VERIFY IF USER EXISTS
  User.find().where('email').equals(email).exec(function(err, user){
    //SHOULD RETURN WIT A VALID USER
    if (user.length === 0){
      res.status(404).json({errorMessage: "this user does not exist"})
    }
    else {
      //  COMPARE PASSWORDS
      if (!bcrypt.compareSync(password, user[0].password)){
        res.status(401).json({errorMessage: "invalid password"})
      }
      else {
        var token =jwt.sign({id:user[0]._id, isAdmin: user[0].isAdmin, iat:Date.now()}, process.env.JWT_SECRET)
        res.header("Authorization", token).status(200).json({user:user[0], token: token})
      }
    }
  })
}
}

function register (req, res) {
//GET THE BODY
 var email = req.body.email;
 var password = req.body.password;
 if(!email || !password){
   res.json({errorMessage:"Email and password must be set!"})
 }
//VERIFY TO SEE IF USER EXISTS
 User.find().where('email').equals(email).exec(function(err, user){
   //SHOULD RETURN NULL
   if (user.length > 0){
     res.json({errorMessage: "A user exists wit dat email"})
   }
   else{
     req.body.isAdmin = false;

     //create new user

     var newUser = new User(req.body)
     newUser.save(function(err,user){
       if(err){
         res.json({errorMessage: "no save user cuz" + err})
       }
       else{
        //  var token = jwt.sign({id: user._id, isAdmin:user.isAdmin, iat: Date.now()});
         res.status(200).json(user)
         console.log(user);
       }
     })
   }
 })

}

function verify(req, res, next) {
  var token = req.header('Authorization')
  jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
    if (error) {
      res.json({error: error})
    }
    else {
      req.token = decoded
      next()
    }
  });
}

function verifyAdmin(req, res, next) {
  var token = req.header('Authorization')
  jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
    if (error) {
      res.json({ error: error})
    }
    else if (!decoded.isAdmin) {
      res.json({ error: "Not an admin"})
    }
    else {
      req.token = decoded
      next()
    }
  });
}

module.exports = { login, register, verify, verifyAdmin }