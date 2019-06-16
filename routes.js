const express = require('express');
const studentRoutes = express.Router();
const {
  showHome,
  showAbout,
  showContact,
  showAPIPage,
  showStudents,
  showStudent,
  allStudents,
  singleStudent,
  addStudent,
  deleteStudent,
  editStudent,
  showAddStudent,
  showEditStudent
} = require('./controllers/student.controllers');

studentRoutes.get('/api/v1.0/students', allStudents);
studentRoutes.post('/api/v1.0/students', addStudent);
studentRoutes.get('/api/v1.0/students/:search', singleStudent);
studentRoutes.post('/api/v1.0/students/:id/edit', editStudent);
studentRoutes.get('/api/v1.0/students/:id/delete', deleteStudent);

studentRoutes.get('/', showHome);
studentRoutes.get('/about', showAbout);
studentRoutes.get('/contacts', showContact);
studentRoutes.get('/api', showAPIPage);

studentRoutes.get('/students', showStudents);
studentRoutes.get('/add-student', showAddStudent);
studentRoutes.get('/edit-student/:id', showEditStudent);
studentRoutes.get('/students/:id', showStudent);
module.exports = studentRoutes;
