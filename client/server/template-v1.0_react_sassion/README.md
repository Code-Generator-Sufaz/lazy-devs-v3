### template-v1.0_react_sassion
react + session


### This is the template provide to user All code will only be in one file

### frontend - app.js

### backend - server.js


## error code

- {errCode: 9, data: err, path: 'create user'} // email check for singUp
- {errCode: 10, data: err, path: 'create user'} // save user to mongodb
- {errCode: 11, data: { msg: "email already used" }, path: 'create user'} // find the email address in DB

- {errCode: 15, data: { msg: "email not find" }, path: 'user login'}
- {errCode: 16, data: { msg: "wrong password" }, path: 'user login'}

- {errCode: 33, data: { msg: "you need login first" }, path: 'middleware authCheck'}


next step: add email verifycation and validator