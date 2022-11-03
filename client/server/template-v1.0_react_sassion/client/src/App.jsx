// This is React Front end code 
// how to ues: 
// copy and paste it in your react_folder/src/App.js

import { useState } from "react";

// settings
const basicUrl = 'http://localhost:5000'

function App() {
  // to show/hide login form and signin from
  const [toggle, setToggle] = useState({
    showSignIn: false,
    showLogIn: false,
    logOut: true
  });

  const [userAuth, setUserAuth] = useState({
    login: false,
    signin: false,
  })

  return (
    <div className="App" style={style.app}>
      <Header toggle={toggle} setToggle={setToggle} userAuth={userAuth} setUserAuth={setUserAuth}/>
      <Home />

      {/* modals */}
      {toggle.showSignIn && <SingIn setUserAuth={setUserAuth}/>}
      {toggle.showLogIn && <LogIn setUserAuth={setUserAuth}/>}

    </div>
  );
}

export default App;

// components

// Header
function Header({ toggle, setToggle, userAuth }) {
  return (
    <div className="header" style={style.header}>
      <h1>Welcome to a new Project</h1>
      <Navbar toggle={toggle} setToggle={setToggle} userAuth={userAuth}/>
    </div>
  );
}

// Navbar
function Navbar({ toggle, setToggle, userAuth }) {
  // switch turn and false for login form, signin form
  const toggleSwitch = e => setToggle(prev => ({ ...prev, [e.target.className]: !prev[e.target.className] }));

  return (
    <div className="navbar">
      <ul style={style.navbar_ul}>
        {!userAuth.login && <>
          <li><span onClick={toggleSwitch} className="showSignIn">Sign In</span></li>
          <li><span onClick={toggleSwitch} className="showLogIn">Log In</span></li>
        </>}

        {userAuth.login && <li><span onClick={toggleSwitch} className="logOut">Log Out</span></li>}
        <li><span>Home</span></li>
      </ul>

    </div>
  );
}

// Home
function Home() {
  return (
    <div className="home">
      Here is my Home Page

    </div>
  );
}

// SingIn
// import { useState } from "react";
function SingIn() {
  const [display, setDisplay] = useState({
    msg:"",
    data: {},
    err:{}
  });
  const signinHandler = e => {
    e.preventDefault();
    // clear display
    setDisplay({msg:"", data: {}, err:{}})
    // data to send to backend
    const dataToSend = {
      email: e.target.email.value,
      password: e.target.password.value
    };
    // fetch with post method
    fetch(basicUrl+'/user/create', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => setDisplay(prev=>({...prev, msg: "Welcom Join Us", data: data})))
      .catch(error => setDisplay(prev=>({...prev, msg: "WoW! Something wrong!", err: error})));
  }
  return (
    <div className="signin">
      Sign In Form
      <form onSubmit={signinHandler}>
        <div>
          <label htmlFor="">Your Email Address</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label htmlFor="">Your Password</label>
          <input type="password" name="password" />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
        <div className="display">
          {display.msg && <>
          <h4>{display.msg}</h4>
          <p>{JSON.stringify(display)}</p>
          </>}
        </div>
      </form>

    </div>
  );
}

// LogIn
// import { useState } from "react";
function LogIn() {
  const [display, setDisplay] = useState({
    msg:"",
    data: {},
    err:{}
  });
  const loginHandler = e => {
    e.preventDefault();
    // clear display
    setDisplay({msg:"", data: {}, err:{}})
    // data to send to backend
    const dataToSend = {
      email: e.target.email.value,
      password: e.target.password.value
    };
    // fetch with post method
    fetch(basicUrl+'/user/login', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => setDisplay(prev=>{
        return result.errCode ?  {...prev, err: result, msg: result.data.msg} : {...prev, data: result, msg: "Welcome Join Us"};
      }))
      .catch(error => setDisplay(prev=>({...prev, msg: "WoW! Something wrong!", err: error})));
  }
  return (
    <div className="login">
      Log in
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="">Email:</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label htmlFor="">Password:</label>
          <input type="password" name="password" />
        </div>
        <div>
          <button type="submit">Log In</button>
        </div>
        <div className="display">
          {display.msg && <>
          <h4>{display.msg}</h4>
          <p>{JSON.stringify(display)}</p>
          </>}
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






