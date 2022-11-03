// importing dependencies
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt')
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
// config dotenv
require('dotenv').config();
// importing Port
const port = process.env.PORT || 5000;
const dbLink = process.env.MONGODB;

// connect to database
mongoose.connect(dbLink, err => {
    if (err) throw (err)
    console.log("MongoDB is connected")
});

// middleweares
app.use(cors())
app.use(express.json())
app.use(session({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 } // time period for session data(e.g. store data for 30 day)
}))

// Routers
// index router
const indexRouter = express.Router()

indexRouter.get('/', home_controller)

// user router
const userRouter = express.Router()

userRouter.get('/login', login_form_controller)
userRouter.post('/login', login_submit_controller)

userRouter.get('/create', register_form_controller)
userRouter.post('/create', register_submit_controller)

userRouter.get('/logout', authCheck, logout_controller)

// Router settings
app.use('/', indexRouter)

app.use('/user', userRouter)


// server listen and connect to database
app.listen(port, () => {
    console.log("Server is running on port: " + port)
});

// mongoose Schema and model
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User_model = model('user', userSchema);

// controllers

function home_controller(req, res) {
    res.json("This is home page")
} // Home Page

function login_form_controller(req, res) { } // Login Page

function login_submit_controller(req, res) {
    // compare user input(req.body) and data in database
    const { email, password } = req.body;
    User_model.findOne({ email }, (err, user) => {
        if (err) throw err;
        if (!user) res.json({ errCode: 15, data: { msg: "email not find" }, path: 'user login' })
        else { // compare the password
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                if (!result) res.json({ errCode: 16, data: { msg: "wrong password" }, path: 'user login' })
                else {   
                    req.session.user = user;            
                    req.session.user.password = null;            
                    console.log(req.session.user)
                    req.session.save();
                    // response front end
                    res.json({ login: true });
                }
            })
        }
    })
}

function register_form_controller(req, res) { }

function register_submit_controller(req, res) {
    const { email, password } = req.body;
    // check the email is already used or not
    User_model.findOne({ email })
        .then(result => {
            // email is already used
            if (result) res.json({ errCode: 11, data: { msg: "email already used" }, path: 'create user' })
            else { // email is can be ues
                // encrypt password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        req.body.password = hash;
                        // save the data in mongodb
                        User_model.create(req.body)
                            .then(data => {
                                // save user info in session
                                req.session.user = data;
                                req.session.user.password = null; 
                                req.session.save();
                                // response front end
                                res.json({ signin: true, login: true })
                            })
                            .catch(err => res.json({ errCode: 10, data: err, path: 'create user' }))
                    })
                })

            }
        })
        .catch(err => res.json({ errCode: 9, data: err, path: 'create user' }))

}

function logout_controller(req, res) {
    req.session.destroy()
    res.json({ login: false });
}


// middle ware 

// auth check
function authCheck(req, res, next){
    // only if User already loged in
    if(req.session.user) next()
    else res.json({ errCode: 33, data: { msg: "you need login first" }, path: 'middleware authCheck' })
}