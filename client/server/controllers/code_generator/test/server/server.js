// importing dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const secret = 'sufaz' || process.env.SECRETKEY || "test";
const nodemailer = require('nodemailer');
// config dotenv
require('dotenv').config();
// importing Port
const port = process.env.PORT || 5000;
const dbLink = process.env.MONGODB || "mongodb://localhost:27017/a_web_developer"
// Template - 3  jsonwebtoken + axios(.create) save token in localStorage
const jwt = require('jsonwebtoken');
// connect to database
mongoose.connect(dbLink, err => {
    if (err) throw (err)
    console.log("MongoDB is connected")
});
// nodemailer settings with mailtrap
// https://nodemailer.com/about/
const transporter = nodemailer.createTransport({
    host: "12",
    port: 123,
    auth: {
        user: "123",
        pass: "123"
    }
});
// function to send email using transporter
const nodeMailerOrigin = "http://localhost:5000/user"
function sendEmail(mailTo, subject, message) {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: "hudirybw@gmail.com",
            to: mailTo,
            subject: subject,
            html: message // sending html formed code
        })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject({ errCode: 12, data: error, path: 'nodemailer.sendEmail' });
            })
    })
};
// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// Template - 3  jsonwebtoken + axios(.create) save token in local storage
app.use(cors())
// Routers
// index router
const indexRouter = express.Router()
indexRouter.get('/', home_controller)
// user router
const userRouter = express.Router()
userRouter.post('/login', login_submit_controller)
userRouter.post('/create', register_submit_controller)
userRouter.get('/verify', verify_email_controller)
userRouter.get("/profile", auth, profile_controller);
userRouter.get("/logout", auth, logout_controller);
userRouter.get("/loginStatus", auth, loginStatus_controller);
// Router settings
app.use('/', indexRouter)
app.use('/user', userRouter)
// server listen and connect to database
app.listen(port, () => console.log("Server is running on port: " + port ));
// mongoose Schema and model
const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    verify: {
        email: {
        type: Boolean,
        default: false
        } 
    },
    secretKey: {
        type: String
    },
    Zhuo_Yang_email: {
            required: false,
            unique: true,
            type: String
        },
  Zhuo_1_number: {
            required: false,
            unique: false,
            type: Number
        }
});
// mongoose model
const User_model = model('user', userSchema);
// controllers
function home_controller(req, res) {
    console.log("Front end say hi")
    res.json("Hello from Back end")
} // Home Page
// sign up controller-start
async function register_submit_controller(req, res) {
    const { Zhuo_Yang_email } = req.body;
    // for(let key in req.body){
    //   if(key.split('_')[1] == 'number'){
    //     req.body[key] = + req.body[key]
    //   }
    // }
    try {
      // check the Zhuo_Yang_email is already used or not
      const existUser = await mongodbFindOne(User_model, { Zhuo_Yang_email });
      if (existUser)
        return res.json({
          errCode: 11,
          data: { msg: "Zhuo_Yang_email already used" },
          path: "create user",
        });
      // Zhuo_Yang_email is ready to use
      // save data in mongodb
      const userSaved = await mongodbSave(User_model, req.body);
      // get the _id of the user from mongodb
      const id = userSaved._id.toString();
      // send verification Emails to user by calling function sendEmail
      // create secretKey will send to user in verify email) based on id
      const nodemailerSecretKey = await encrypt(id);
      // save the secretKey to database
      await mongodbUpdate(
        User_model,
        { _id: id },
        { secretKey: nodemailerSecretKey }
      );
      // create the email message
      const message = `Hello,<br>
               The Email "${req.body.Zhuo_Yang_email}" is used to register in a web developer. To verify Your account please click on <a href="${nodeMailerOrigin}/verify?Zhuo_Yang_email=${req.body.Zhuo_Yang_email}&secretKey=${nodemailerSecretKey}">This Link</a>
               Thanks
               Auth-Code-Gen Team.`;
      await sendEmail(
        req.body.Zhuo_Yang_email,
        "Verification Email from a web developer",
        message
      ); // end of nodemailer part
      // Template - 3  jsonwebtoken + axios(.create) save token in localStorage
      // create a jwt token and send it to front end
      const token = await jwtSign({ id }, secret, { expiresIn: 2592000000 });
      res.json({
        signup: true,
        login: true,
        token,
        verificationEmailSended: true
      });
      // end this template
      req.user = { ...userSaved._doc, password: null, secretKey: null };
    } catch (error) {
      res.json(error);
    }
  } // controller-end
// login controller-start
async function login_submit_controller(req, res) {
    const { Zhuo_Yang_email } = req.body;
    try {
      const user = await mongodbFindOne(User_model, { Zhuo_Yang_email });
      // check if user not exist, user should be null
      if (!user) {
        return res.json({
          errCode: 15,
          data: { msg: "Zhuo_Yang_email not find" },
          path: "user login",
        });
      } // end  if (!user)
      checkAllLoginData = await mongodbFindOne(User_model, { Zhuo_Yang_email });
      if (!checkAllLoginData) {
        return res.json({
          errCode: 16,
          data: { msg: "wrong login data" },
          path: "user login",
        })}; 
      // get the _id of the user from mongodb
      const id = user._id.toString();
      // Template - 3  jsonwebtoken + axios(.create) save token in localStorage
      // create a jwt token and send it to front end
      const token = await jwtSign({ id }, secret, { expiresIn: 2592000000 })
      res.json({ login: true, token });
      // end this template
      req.user = { ...user._doc, password: null, secretKey: null };
    } catch (error) {
      res.json(error);
    }
  } // controller-end
async function verify_email_controller(req, res) {
    const { Zhuo_Yang_email, secretKey } = req.query;
    try {
      // use Zhuo_Yang_email and secretKey to find that user
      const user = await mongodbFindOne(User_model, { Zhuo_Yang_email, secretKey });
      // if user==null that means verify_email is unsuccessful
      if (!user) return res.json({ errCode: 13, data: err, path: "verify_email_controller.user_not_find" });
      // verify_email success update db
      await mongodbUpdate(User_model, {_id: user._id}, { "verify.email": true });
      res.json({ path: "emailVerification", verified_email: true });
    } catch (error) {
      res.json(error);
    }
};
function logout_controller(req, res) {
  // Template - 3  jsonwebtoken + axios(.create) save token in localStorage
  // with this template the logout will happen in front end, just destroy the token in localStorage
  res.json({ login: false, logout: true });
};
function profile_controller(req, res) {
    res.json(req.user);
};
function loginStatus_controller(req, res) {
  res.json({ login: true })
}
// middleware
// auth check
// this middleware is used to check if user is login or not
// if user is login, save user data in req.user and call next()
async function auth(req, res, next) {
  // Template - 3  jsonwebtoken + axios(.create) save token in localStorage
  const token = req.headers.token;
  if (token == undefined) return res.json({ errCode: 33, data: { msg: "you need login first" }, path: 'middleware.auth' });  
  //  check is there token => convert token to id => find user by id
try {
  const id = (await jwtVerify(token, secret)).id;
  const user = await mongodbFindOne(User_model, { _id: id });
  if (user) {
    req.user = {...user._doc, password: null, secretKey: null};
    next()
  } else res.json({ errCode: 33, data: { msg: "you need login first" }, path: 'middleware.auth' })
}
catch (error) {
  res.json(error)
} // end Template - 3  jsonwebtoken + axios(.create) save token in localStorage
};
// partial functions
function encrypt(data, rounds = 10) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(rounds, (error, salt) => {
      if (error)
        return reject({ errCode: 0, data: error, path: "encrypt.genSalt" });
      else {
        bcrypt.hash(data, salt, (error, hashedData) => {
          if (error)
            return reject({ errCode: 1, data: error, path: "encrypt.hash" });
          else {
            return resolve(hashedData);
          }
        });
      }
    });
  });
}
function compareEncryptData(data, encryptData) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(data, encryptData, (error, result) => {
      if (error)
        return reject({
          errCode: 2,
          data: error,
          path: "compareEncryptData.compare",
        });
      else {
        resolve(result);
      }
    });
  });
}
function jwtSign(data, secretKey, option = null) {
  return new Promise((resolve, reject) => {
    if (typeof data == "object" && !Array.isArray(data) && option) {
      jwt.sign(data, secretKey, option, (error, token) => {
        if (error)
          return reject({
            errCode: 3,
            data: error,
            path: "jwtSign.sign.payload.obj",
          });
        else {
          // console.log("token with option");
          return resolve(token);
        }
      });
    } else {
      jwt.sign(data, secretKey, (error, token) => {
        if (error)
          return reject({
            errCode: 4,
            data: error,
            path: "jwtSign.sign.payload.str",
          });
        else {
          // console.log("token without option");
          return resolve(token);
        }
      });
    }
  });
}
function jwtVerify(token, secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (error, resultObj) => {
        if(error) reject({errCode: 5, data: error, path: 'jwtVerify.verify'})
        else {
          resolve(resultObj)
        }
      })
    })
  }
  function mongodbSave(model, data) {
    return new Promise((resolve, reject) => {
      model
        .create(data)
        .then((savedData) => resolve(savedData))
        .catch((error) =>
          reject({ errCode: 20, data: error, path: "mongodbSave.create" })
        );
    });
  }
  function mongodbUpdate(model, query, dataToUpdate) {
    return new Promise((resolve, reject) => {
      model
        .updateOne(query, dataToUpdate)
        .then((result) => resolve(result))
        .catch((error) =>
          reject({ errCode: 21, data: error, path: "mongodbUpdate.updateOne" })
        );
    });
  }
  function mongodbFindOne(model, query) {
    return new Promise((resolve, reject) => {
      model
        .findOne(query)
        .then((result) => {
          resolve(result);
        })
        .catch((error) =>
          reject({ errCode: 22, data: error, path: "mongodbFindOne.findOne" })
        );
    });
  }