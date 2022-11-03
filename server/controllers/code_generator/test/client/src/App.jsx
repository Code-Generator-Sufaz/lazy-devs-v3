// This is React Front end code 

// how to ues: 

// copy and paste it in your react_folder/src/App.js
import { useState, useEffect } from "react";

// settings
const baseURL = 'http://localhost:5000';
function App() {
  // to show/hide login form and signup from
  const [toggle, setToggle] = useState({
    showSignIn: false,
    showLogIn: false,
    logOut: true
  });
  const [userAuth, setUserAuth] = useState({
    login: false,
    signup: false,
  })
  const [display, setDisplay] = useState({
    msg: "",
    data: {},
    err: {}
  });
  // console.log(display)
  // userAuth is set to false bu default. That means if you refresh the page, userAuth = false even you already login and the auth is still valid
  // this useEffect is used to check auth status of the user
  useEffect(() => {
    // Template - 2  jsonwebtoken + cookie-parser
    fetch(baseURL + '/user/loginStatus', {credentials: 'include'})
    .then(response => response.json())
    .then(data => {
      if (data.login) {
        setUserAuth(data)
      }
    })
    .catch(err => {console.log(err)}) // Template end
  }, [])
  return (
    <div className="App" style={style.app}>
      <Header toggle={toggle} setToggle={setToggle} userAuth={userAuth} setUserAuth={setUserAuth} setDisplay={setDisplay}/>
      <Home display={display}  setDisplay={setDisplay}/>
      {/* modals */}
      {toggle.showSignIn && <SingUp setUserAuth={setUserAuth} setToggle={setToggle} setDisplay={setDisplay}/>}
      {toggle.showLogIn && <LogIn setUserAuth={setUserAuth} setToggle={setToggle} setDisplay={setDisplay}/>}
    </div>
  );
}
export default App;

// components

// Header
function Header({ toggle, setToggle, userAuth, setUserAuth, setDisplay }) {
  return (
    <div className="header" style={style.header}>
      <h1>Welcome to a new Project</h1>
      <Navbar toggle={toggle} setToggle={setToggle} userAuth={userAuth} setUserAuth={setUserAuth} setDisplay={setDisplay}/>
    </div>
  );
}

// Navbar
function Navbar({ toggle, setToggle, userAuth, setUserAuth, setDisplay }) {
  // switch turn and false for login form, signup form
  const toggleSwitch = e => setToggle(prev => ({ showSignIn: false,
    showLogIn: false, [e.target.className]: !prev[e.target.className] }));
  const profileHandler = e => {
    // touch the auth check api and display the result
    // Template - 2  jsonwebtoken + cookie-parser
    fetch(baseURL + "/user/profile", {credentials: 'include'})
    .then(response => response.json())
    .then(data => setDisplay(pre=> ({ data: data})))
    .catch(err => setDisplay(pre=> ({ err: err}) )) // Template end
  };
  const logOutHandler = e => {
    // call backend to destroy cookie
    fetch(baseURL + '/user/logout', {credentials: 'include'})
    .then(response => response.json())
    .then(data =>{
      if (data.logout) {
        setUserAuth(pre=>({...pre, login: false}))
      // navigate to another page to trigger rerender
      setDisplay({
        msg: "You logged out",
        data: {},
        err: {}
      })}
    })
    .catch(err => setDisplay(pre=> ({errCode: 17, data: { msg: "wow something wrong" , ...err}, path: 'user logout'}) ))
  }
  return (
    <div className="navbar">
      <ul style={style.navbar_ul}>
        {!userAuth.login && <>
          <li><span onClick={toggleSwitch} className="showSignIn">Sign up</span></li>
          <li><span onClick={toggleSwitch} className="showLogIn">Log In</span></li>
        </>}
        {userAuth.login && <li><span onClick={logOutHandler} className="logOut">Log Out</span></li>}
        <li><span onClick={profileHandler}>profile</span></li>
      </ul>
    </div>
  );
}

// Home
function Home({display, setDisplay}) {
  // touch the backend and display res.json (string)
  useEffect(()=>{
    fetch(baseURL)
    .then(response => response.json())
    .then(data=> {
      setDisplay(pre=>({...pre, msg:data}))
    })
    .catch(err=> setDisplay(pre=>({...pre, data:err})))
  }, [])
  return (
    <div className="home">
      {
        display && <>
        {display.msg && <h3>{display.msg}</h3> }
        {display.data && <p>data: {JSON.stringify(display.data)}</p> }
        {display.err && <p>error: {JSON.stringify(display.err)}</p> }
        </>
      }
    </div>
  );
}

// SingUp

// import { useState } from "react";
function SingUp({setUserAuth, setToggle, setDisplay}) {
  const signUpHandler = e => {
    e.preventDefault()
    // data to send to backend
    const dataToSend = {
      fran_email: e.target.fran_email.value,
      password_password: e.target.password_password.value,
      ko_text: e.target.ko_text.value,
      password_number: e.target.password_number.value
    };
    // fetch with post method
      // Template - 2  jsonwebtoken + cookie-parser
      fetch(baseURL+'/user/create', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((data) => {
          setUserAuth({login: data.login, signup: data.signup}) 
          setToggle({
            showSignIn: false,
            showLogIn: false,
            logOut: true
          })
          setDisplay(prev => {
                  return data.errCode ? { ...prev, err: data, msg: data.data.msg } : { ...prev, data: data, msg: "Welcome Join Us" };
                 })
          setDisplay(prev=>({...prev, msg: "Welcome Join Us", data: data}))
        })
        .catch(error => setDisplay(prev=>({...prev, msg: "WoW! Something wrong!", err: error}))); // template end here
  }
  return (
    <div className="signup">
      Sign up Form
      <form onSubmit={signUpHandler}>
        <div>
          <label htmlFor="fran_email_0">fran_email</label>
          <input type="email" name="fran_email" id="fran_email_0"/>
        </div>
        <div>
          <label htmlFor="password_password_1">password_password</label>
          <input type="password" name="password_password" id="password_password_1"/>
        </div>
        <div>
          <label htmlFor="ko_text_2">ko_text</label>
          <input type="text" name="ko_text" id="ko_text_2"/>
        </div>
        <div>
          <label htmlFor="password_number_3">password_number</label>
          <input type="number" name="password_number" id="password_number_3"/>
        </div>
        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
}

// LogIn

// import { useState } from "react";
function LogIn({setUserAuth, setToggle, setDisplay}) {
  const loginHandler = e => {
    e.preventDefault()
    // data to send to backend
    const dataToSend = {
      fran_email: e.target.fran_email.value
    };
    // fetch with post method
      // Template - 2  jsonwebtoken + cookie-parser
      fetch(baseURL + '/user/login', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((result) => {
          setDisplay(prev => {
            return result.errCode ? { ...prev, err: result, msg: result.data.msg } : { ...prev, data: result, msg: "Welcome Join Us" };
          });
          setUserAuth({login: result.login });
          setToggle({
            showSignIn: false,
            showLogIn: false,
            logOut: true
          });
        })
        .catch(error => setDisplay(prev => ({ ...prev, msg: "WoW! Something wrong!", err: error }))); // template end here
  }
  return (
    <div className="login">
      Log in
      <form onSubmit={loginHandler}>
      <div>
        <label htmlFor="fran_email_0">fran_email</label>
        <input type="email" name="fran_email" id="fran_email_0"/>
      </div>
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
}

// styles
const style = {
  app: {
    width: '100vw',
    height: '100vh',
    backgroundColor: "lightgray",
  },
  header: {
    textAlign: 'center'
  },
  navbar_ul: {
    width: '100vw',
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}