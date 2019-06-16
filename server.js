require('dotenv').config(); // loads environment variables from a .env file into process.env
const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 5000; // configuring port
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes');
const displayDayTime = require('./shared/display-day-time');

app.use(cookieParser())

// An example of app level middleware
// Middleware access req object, res object and can manipulate the object
// next method stop the request response cycle
app.use((req, res, next) => {
  //cookies that have not been signed

  console.log('cookies', req.cookies);
  console.log(cookieParser)

  // Cookies that have been signed
  console.log('Signed cookies', req.signedCookies)
  res.cookie('myFirstCookie','looks Good')
  const time = displayDayTime();
  console.log(req.url);
  console.log(`The user is checking ${req.url} at ${time}`);
  next();
});

// connecting mongoose using enviromental variables
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, err => {
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
app.use('/assets/favicon', express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(studentRoutes); // routes

// the app has to attach to a listen event for the server to run
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}...`);
});
