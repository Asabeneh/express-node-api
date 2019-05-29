const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const students = require('./data/students');
console.log(students);

//body-parser middleware to get data from req.body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Helllo, express'));
app.get('/students', (req, res) => {
  res.json(students);
});
app.get('/students/:search', (req, res) => {
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
app.delete('/students/:id', (req, res) => {
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
app.post('/students', (req, res) => {
  console.log(req.body);
  const id = students.length + 1;
  const newStudent = req.body;
  newStudent.id = id;
  students.push(newStudent);
  res.send('new person added');
});

app.put('/students/:id', (req, res) => {
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
