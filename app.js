const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const dbUri = 'mongodb://localhost:27017/users';
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();

// Passport Config
require('./config/passport')(passport);


//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//BodyParser
app.use(express.urlencoded({ extended: false}));

//Express Session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  // Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });



//DB Connection
mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>console.log("MongoDB Connected"))
    .catch(err => console.log(err));




//Routes
app.use('/',require('./Routes/index'));
app.use('/users',require('./Routes/users'));

//Server
const PORT = 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));