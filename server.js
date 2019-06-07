require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require('./models/Student');

mongoose.connect(process.env.MONGODB_URI, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Server is connected to mongodb data base Atlas');
});

// setting the view engine
app.set('view engine', 'ejs');

// serving static file
app.use(express.static('public'));
//body-parser middleware to get data from req.body

//body-parser middleware to get data from req.body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
console.log(__dirname);
const person = {
  name: 'Asab'
};

app.get('/', (req, res) => {
  res.render('pages/index', { person });
});
app.get('/about', (req, res) => {
  res.render('pages/about');
});
app.get('/contacts', (req, res) => {
  res.render('pages/contact');
});
app.get('/teachers', (req, res) => {
  res.json(teachers);
});
app.get('/students', (req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      res.status = 400;
      res.send('Not found');
    }
    res.render('pages/students', { students });
  });
});
app.get('/students/:id', (req, res) => {
  const id = req.params.id;
  Student.findOne({ _id: id }, (err, student) => {
    if (err) {
      res.status = 400;
      res.send('Not found');
    }
    res.render('pages/student', { student });
  });
});
app.get('/api/v1/students', (req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      res.status = 404;
      return;
    }
    res.json(students);
  });
});
app.get('/api/v1/students/:search', (req, res) => {
  const id = req.params.search;
  Student.findOne({ _id: id }, (err, student) => {
    if (err) {
      res.status = 404;
      return;
    }
    res.json(student);
  });
});
app.delete('/api/v1/students/:id', (req, res) => {
  const id = req.params.id;
  Student.deleteOne({ _id: id }, (err, student) => {
    if (err) {
      res.status = 400;
      res.send('Not found');
    }
    res.send('A student has been deleted');
  });
});
app.post('/api/v1/students', (req, res) => {
  const newStudent = new Student(req.body);
  newStudent.save(err => {
    if (err) {
      console.log(err);
      return;
    }
    res('A student has been added');
  });
});

app.put('/api/v1/students/:id', (req, res) => {
  const id = req.params.id;
  const { name, country, age, bio } = req.body;
  Student.findOne({ _id: id }, (err, student) => {
    student.name = name;
    student.country = country;
    student.age = age;
    student.bio = bio;
    student.save(err => {
      if (err) {
        res.status = 404;
        console.log(err);
      }
      res.send('A student has been updated');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}...`);
});

