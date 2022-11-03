import styled from "styled-components";
import React from "react";
import { RiExternalLinkFill } from "react-icons/ri";

export default function Documentation() {
  return (
    <AboutContainer>
      <div className="page-content">
        <h1>Project Description</h1>
        <h3>
          Helps users create, generate and modify code of user authentication
          without the need for coding the basic structure for an MERN
          authentication app. In simpler language, it's an input and form
          generator with already set up User Authentication tool that helps you
          build a website without needing to write all the code from scratch.
          Userwill be able to copy code and install dependencies with npm i,
          then they can develop their own app based on these files.
          Documentation with examples will be provided for better usage of the
          app.
        </h3>
        <div>
          <h4>The two main users of the app will be:</h4>
          <ol>
            <li className="about-color">
              Logged in user: they can download zip file with all the folder
              project structure and save their template settings.
            </li>
            <li className="about-color">
              Not logged in user: They can only copy code from App.js, server.js
              and package.json without saving settings.
            </li>
          </ol>
          <h4> Functionality:</h4>
          <ul>
            <li className="about-color">
              Create or generate form inputs refered to user schemas from the
              backend
            </li>
            <li className="about-color">
              Select different packages or attributes and styles to customize
              their app
            </li>
            <li className="about-color">
              Save, retrieve and edit (latest version) code for registered users
              on a dashboard.
            </li>
            <li className="about-color">
              Download zip file with full-stack folder structure for registered
              users.
            </li>
            <li className="about-color">Light/Dark theme</li>
          </ul>
          <h4>Technical requirements:</h4>
          <h5>Backend/Server Side:</h5>
          <h5>Database:</h5>
          <ul>
            <li className="about-color">
              <a href="https://dev.mysql.com/doc/" target="_blank">
                Mysql (For future versions) <RiExternalLinkFill />
              </a>
            </li>
            <li className="about-color">
              <a href="https://www.mongodb.com/docs/" target="_blank">
                MongoDb
                <RiExternalLinkFill />
              </a>
            </li>
          </ul>{" "}
          <ul>
            <h5 className="about-color">Server:</h5>
            <li className="about-color">
              <a href="https://nodejs.org/en/docs/" target="_blank">
                Nodejs
                <RiExternalLinkFill />
              </a>
            </li>
            <li className="about-color">Packages:</li>
            <li className="first-list">
              <a href="https://expressjs.com/en/5x/api.html" target="_blank">
                Express-js <RiExternalLinkFill />
              </a>
            </li>
            <li className="first-list">
              {" "}
              <a
                href="https://www.npmjs.com/package/nodemailer"
                target="_blank"
              >
                Nodemailer (Last version)
                <RiExternalLinkFill />
              </a>
            </li>
            <li className="first-list">
              <a
                href="https://www.npmjs.com/package/express-fileupload"
                target="_blank"
              >
                Express-fileupload
                <RiExternalLinkFill />
              </a>
            </li>
            <li className="first-list">
              Or any other NPM package useful for this project.
            </li>
            <li className="about-color">Security:</li>
            <li className="first-list">
              {" "}
              <a
                href="https://www.npmjs.com/package/express-session"
                target="_blank"
              >
                Express-session or JWT
                <RiExternalLinkFill />
              </a>{" "}
            </li>
            <li className="first-list">
              {" "}
              <a href="https://www.npmjs.com/package/bcrypt" target="_blank">
                {" "}
                Bcrypt
                <RiExternalLinkFill />
              </a>
            </li>
            <li className="first-list">
              {" "}
              <a
                href="https://express-validator.github.io/docs/"
                target="_blank"
              >
                {" "}
                Server side data Validation (express-validator)
                <RiExternalLinkFill />
              </a>
            </li>
          </ul>
          <h5>GUI/FrontEnd:</h5>
          <li className="first-list">
            {" "}
            <a
              href="https://redux.js.org/introduction/getting-started"
              target="_blank"
            >
              React (React-Redux)
              <RiExternalLinkFill />
            </a>{" "}
          </li>
          <li className="first-list">
            {" "}
            <a href="https://reactrouter.com/en/main" target="_blank">
              React Router
              <RiExternalLinkFill />
            </a>{" "}
          </li>
          <li className="first-list">
            HTML, CSS,Javascript, Styled Components.
          </li>
          <h5>Deployment:</h5>
          <li className="first-list">Real Hosting Server.</li>
          <li className="first-list">
            {" "}
            <a
              href="https://devcenter.heroku.com/categories/reference"
              target="_blank"
            >
              Heroku
              <RiExternalLinkFill />
            </a>{" "}
          </li>
          <li className="first-list">Localhost </li>
          <li className="first-list">Additional Ideas:</li>
          <li className="first-list">Localhost Additional Ideas:</li>
        </div>
      </div>
    </AboutContainer>
  );
}

//Styled components
const AboutContainer = styled.div`
  h1 {
    text-align: center;
    color: #65d4d1;
  }
  h3 {
    font-style: italic;
    margin: 40px 50px;
  }
  h4 {
    margin: 20px 50px;
    color: #65d4d1;
  }
  li {
    margin: 10px 60px;
  }
  h5 {
    margin: 10px 50px;
  }
  .first-list {
    margin: 5px 100px;
    color: white;
  }
  .about-color {
    color: white;
  }
  a {
    color: white;
    text-decoration: none;
  }
`;
