`npm install --save jsonwebtoken`

```javascript
var jwt = require('jsonwebtoken')
```

# jwt has two methods.

  - jwt.sign()
    - takes 2 arguments:
        - the payload you wish to sign (userId)
        - The process.env.JWT_SECRET (concats this string before hashing)
    - It then hashes the payload and returns the token value.
  - jwt.verify()
    - takes 2 arguments:
        - the payload you wish to verify from the req object
        - The process.env.JWT_SECRET (concats this string before decoding)
    - It then decodes the payload to verify the user.

Once a user is created or a login event has successfully been done set the header with the token
`res.header('x-auth', token).status(200).json(user)`

Create custom middleware using jwt.verify to decode the custom header and set the req.token object.

```javascript
function verify(req, res, next) {
	var token =  req.header('x-auth')
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
```

# bcryptjs has 3 methods

`npm install --save bcryptjs`

 - bcrypt.genSalt()
  	- takes 2 arguments:
      	- number of salt rounds
      	- call back function
 - bcrypt.hash()
    - takes 3 arguments:
       - The password (or string) you wish to salt
       - The salt
       - call back function that gives you the hash
 - bcrypt.compare()
    - takes 3 arguments:
       - The password (or string) you wish to compare.
       - The hashed password (or string) you wish to compare it to.
       - call back function with either an error or result(bool).

```javascript
var bcrypt = require('bcryptjs')
var password = req.body.password

bcrypt.genSalt(10, function(error, salt) {
  bcrypt.hash(password, salt, function(error, hash) {
  		// save the hash in our DB
  })
})

bcrypt.compare(req.body.password, hashedPassword, function(error, result) {
	// result will be a bool
})
```

# Postgres Install

- Download Postgres app
- Download Postico
- run `sequelize db:migrate` to run existing migrations.
- run `sequelize migration:create` to create a new migration.
