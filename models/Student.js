const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 15
  },
  country: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  createAt: {
    type: Date
  }
});

module.exports = Student = mongoose.model('student', studentSchema);
