const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User= require('../models/User');


router.get('/login',(req,res)=>{
    res.render('login');
});


router.get('/register',(req,res)=>{
    res.render('register');
});

router.post('/register',(req,res)=>{
    const {name,email,phone,address,password,password2,createdAt}= req.body;
    let errors =[];

    if(password!==password2){
        errors.push({msg:'Passwords do not match'});
    }

    if(errors.length>0){
        res.render('register',{errors,name,email,phone,address,password,password2});

    }else{
        //Validation
        User.findOne({name:name})
        .then(user =>{
            if(user){
                errors.push({msg:'Username already exits'})
                res.render('register',{errors,name,email,phone,address,password,password2});

            }else{
                const newUser = new User({
                    name,
                    email,
                    phone,
                    address,
                    username:name,
                    password,

                });
                //Hash Password
                bcrypt.genSalt(10,(err, salt)=>
                    bcrypt.hash(newUser.password, salt,(err,hash)=>{
                        // if (err) throw err;
                        //Set password to hashed
                        newUser.password=hash;

                        newUser.save()
                            .then(user =>{
                                req.flash('success_msg','You are Registered!');
                                res.redirect('/users/login');
                            })
                            .catch((err)=> console.log(err));
                    }))
            }
        });
    }

});
// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
  

 
  //Logout
  router.get('/logout', (req, res) => {

    req.logout( err => {
        if(err) { return next(err) ;}
        req.flash('success_msg', 'You are logged out');
        res.redirect('/users/login');
        }

    );
});

module.exports = router;