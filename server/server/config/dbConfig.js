const mongoose  = require('mongoose');

mongoose.connect('mongodb+srv://rituraj:Rx2000!Rn@cluster1.t5pn07e.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// Success console log
db.on('connected', () => {
  console.log('Successfully connected to MongoDB.');
});

// Error code console log
db.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err);
});

// Module exports
module.exports = db;
