const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String
  },
  country: {
    type: String
  },
  age: {
    type: Number
  },
  bio: {
    type: String
  },
  createAt: {
    type: Date
  }
});

module.exports = Student = mongoose.model('student', studentSchema);
