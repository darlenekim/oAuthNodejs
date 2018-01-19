var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL);

// db connection event
mongoose.connection.once('open', function(cb) {
  console.log(`Mongoose connnected to: ${process.env.DATABASE_URL}`);
});

module.exports = mongoose;
