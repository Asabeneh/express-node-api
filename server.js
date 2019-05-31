const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const students = require('./data/students');

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
  name: 'Asab',
  age: 250
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
app.get('/students', (req, res) => {
  res.render('pages/students', { students });
});
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.filter(st => st.id === id)[0];

  res.render('pages/student', { student });
});
app.get('/api/v1/students', (req, res) => {
  res.json(students);
});
app.get('/api/v1/students/:search', (req, res) => {
  const id = parseInt(req.params.search);
  const name = req.params.search.toLowerCase();

  let found = false;
  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id || students[i].name.toLowerCase() === name) {
      res.json(students[i]);
      found = true;
      break;
    }
  }

  if (!found) {
    res.send('A person with this id not ' + id);
  }
});
app.delete('/api/v1/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let found = false;
  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      students.splice(i, 1);
      res.send('A peron has been removed');
      found = true;
      break;
    }
  }
  if (!found) {
    res.send('Person not found with this id ' + id);
  }
});
app.post('/api/v1/students', (req, res) => {
  console.log(req.body);
  const id = students.length + 1;
  const newStudent = req.body;
  newStudent.id = id;
  students.push(newStudent);
  res.send('new person added');
});

app.put('/api/v1/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let found = false;
  const { name, country, age, bio } = req.body;
  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      students[i].name = name;
      students[i].country = country;
      students[i].age = age;
      students[i].bio = bio;
      found = true;
      res.send('A person with some id is modifed');
      break;
    }
  }
  if (!found) {
    res.send('Perons with this id not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}...`);
});
