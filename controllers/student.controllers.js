const Student = require('../models/Student');
function showHome(req, res) {
  res.render('pages/index');
}
function showAbout(req, res) {
  res.render('pages/about');
}
function showContact(req, res) {
  res.render('pages/contact');
}
function showStudents(req, res) {
  Student.find({}, (err, students) => {
    if (err) {
      return res.status(404).send('Students Not found')
    }
    res.render('pages/students', { students });
  });
}
function showStudent(req, res) {
  const id = req.params.id;
  Student.findOne({ _id: id }, (err, student) => {
    if (err) {
      return res.status(404).send('A student not found')
    }
    res.render('pages/student', { student });
  });
}
function allStudents(req, res) {
  Student.find({}, (err, students) => {
    if (err) {
       return res.status(404).send('Students Not found')
    }
    res.json(students);
  });
}
function singleStudent(req, res) {
  const id = req.params.search;
  Student.findOne({ _id: id }, (err, student) => {
    if (err) {
      res.status = 404;
      return;
    }
    res.json(student);
  });
}
function showAddStudent(req, res) {
  res.render('pages/add-student');
}
function showEditStudent(req, res) {
  const _id = req.params.id;
  Student.findOne({ _id }, (err, student) => {
    if (err) {
      res.status = 404;
      return;
    }
    res.render('pages/edit-student', { student });
  });
}

function addStudent(req, res) {
  const newStudent = new Student(req.body);
  newStudent.save(err => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/students');
  });
}
function deleteStudent(req, res) {
  const id = req.params.id;
  Student.deleteOne({ _id: id }, (err, student) => {
    if (err) {
      res.status = 400;
      res.send('Not found');
    }
    res.redirect('/students');
  });
}
function editStudent(req, res) {
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
      res.redirect('/students');
    });
  });
}

module.exports = {
  showHome,
  showAbout,
  showContact,
  showStudents,
  showStudent,
  allStudents,
  singleStudent,
  addStudent,
  deleteStudent,
  editStudent,
  showAddStudent,
  showEditStudent
};
