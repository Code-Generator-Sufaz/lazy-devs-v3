import styled from "styled-components";
import React, { useContext } from "react";
import { Context } from "../../../store/Context.js";
import {
  GettingStartedData,
  errorCodes,
  templateLogics,
} from "../../../assets/documentationData/documentationData.js";

export default function Documentation() {
  const { darkTheme } = useContext(Context);
  return (
    <DocumentationContainer>
      <OverviewContainer className={darkTheme ? "dark-theme" : "light-theme"}>
        <div>
          <h2>
            <span>L</span>AZY <span>D</span>EVS - OVERVIEW
          </h2>
          <p>
            Lazy Devs is an authentication tool for developers. It will create
            for you all the authentication backend and front-end forms that are
            necessary for a user to log in, register, and log out from your
            website.
          </p>
        </div>
        <div>
          <h2>INTRODUCTION:</h2>
          <p>
            Lazy Devs is an authentication tool for websites. Usually,
            developers spend 1 - 2 days on their authentication code, both on
            the front end and back end. This tool will create all the code for
            you. In our tool, we choose the most used packages and approaches by
            developers to create user authentication for their websites. In just
            a few clicks you can get it done, copy or download a zip folder, and
            you are all set! :D
          </p>
        </div>
        <div>
          <h2>
            ADVANTAGES OF THE <span>L</span>AZY <span>D</span>EVS TOOL:
          </h2>
          <ul>
            <li>
              save time: usually, it takes 1-2 days of work to write an
              authentication backend and frontend code, with lazy devs you get
              it in less than a minute.
            </li>
            <li>
              Freedom to choose the best approach: As developers, we know that
              each and one of us has his own way of writing the code. After some
              research we’ve made, we chose the 3 most used approaches for
              authentication in a website and let you choose them.
            </li>
            <li>
              It's easy: instead of investing lots of time and energy in
              researching and implementing packages and methods, just a few
              clicks and you have it.
            </li>
            <li>
              Easy for beginners: Our tool is perfect for beginners. First, it
              will help them to get their website authentication fast and
              perfect, and also by doing that they can learn the most used
              methods of creating a user authentication and look deep into the
              code with small explanation comments that we added.
            </li>
          </ul>
        </div>
      </OverviewContainer>
      <GettingStartedContainer
        className={darkTheme ? "dark-theme" : "light-theme"}
      >
        <h2>GETTING STARTED</h2>

        {GettingStartedData.map((step, i) => {
          if (step.links) {
            return (
              <div>
                {" "}
                <p>{step.step}</p>
                <p>{step.content}</p>
                <p>dotenv link : {step.links.dotenv}</p>
                <p>nodemailer link : {step.links.nodemailer}</p>
              </div>
            );
          }
          return (
            <div>
              <h3>{step.step}</h3>
              <p>{step.content}</p>
              <ol>
                {step.steps?.map((innerStep, i) => {
                  if (i === 0) {
                    return <li>{innerStep?.text}</li>;
                  } else if (i === 1 && innerStep.link) {
                    return (
                      <li>
                        {innerStep?.link?.jwt} & {innerStep?.link?.cookie}{" "}
                        {innerStep.text}
                      </li>
                    );
                  } else if (i === 2 && innerStep.link) {
                    return (
                      <li>
                        {innerStep?.link?.jwt} & {innerStep?.link?.axios}{" "}
                        {innerStep?.text}
                      </li>
                    );
                  }
                  return <li>{innerStep.text}</li>;
                })}
              </ol>
              <img src={step.image} />
            </div>
          );
        })}
      </GettingStartedContainer>
      <MoreContent className={darkTheme ? "dark-theme" : "light-theme"}>
        <div>
          <h2>Some Template Logic</h2>
          <ul>
            {templateLogics.map((el, i) => {
              return <li>{el}</li>;
            })}
          </ul>
        </div>
        <div>
          <h2>Error Code For Running The Template</h2>
          <ul>
            {errorCodes.map((errorCode, i) => {
              return <li>{errorCode}</li>;
            })}
          </ul>
        </div>
      </MoreContent>
    </DocumentationContainer>
  );
}

//Styled components

const DocumentationContainer = styled.section`
  width: 90vw;
  height: 100%;
  margin: 0 auto;
  @media screen and (max-width: 500px) {
    width: 95vw;
  }
`;

const OverviewContainer = styled.div`
  min-height: 100vh;
  width: 70%;
  margin: 4rem auto;
  div {
    margin-bottom: 8rem;
    h2 {
      text-align: center;
      margin-bottom: 2rem;
      font-weight: 300;
      font-size: 2rem;
      letter-spacing: 2px;
      word-spacing: 2px;
      span {
        color: var(--warningColor);
      }
    }
    p {
      margin-bottom: 2rem;
      text-align: justify;
      letter-spacing: 2px;
      line-height: 25px;
      text-align: center;
      font-size: 1.1rem;
      font-weight: 300;
      word-spacing: 2px;
    }
    &:nth-of-type(1) {
      h2 {
        font-size: 3rem;
      }
    }
    &:nth-of-type(3) {
      ul {
        margin: 0 auto;
        li {
          margin-bottom: 2rem;
          text-align: justify;

          letter-spacing: 2px;
          line-height: 25px;
          font-weight: 300;
          font-size: 1.1rem;
          word-spacing: 2px;
          @media screen and (max-width: 500px) {
            text-align: left;
          }
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    width: 90%;
    div {
      p {
        text-align: center;
      }
    }
  }
`;

const GettingStartedContainer = styled.div`
  min-height: 100vh;
  width: 70%;
  margin: 4rem auto;
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 300;
    font-size: 3rem;
    letter-spacing: 2px;
    word-spacing: 2px;
  }
  div {
    margin-bottom: 2rem;
    position: relative;
    width: 90%;

    img {
      margin: 1rem auto;
      border: solid 1px white;
      border-radius: 0.2rem;
    }
    h3 {
      font-size: 1.5rem;
      font-weight: 300;
      margin-bottom: 1rem;
    }
    p {
      letter-spacing: 2px;
      line-height: 20px;
      font-size: 1.1rem;
      font-weight: 300;
      line-height: 25px;
      margin-bottom: 0.5rem;
      a {
        color: dodgerblue;
        text-decoration: none;
      }
    }
    ol {
      margin-left: 3rem;
      li {
        letter-spacing: 2px;
        line-height: 20px;
        font-size: 1.1rem;
        font-weight: 300;
        line-height: 25px;
        a {
          color: dodgerblue;
          text-decoration: none;
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    width: 90%;
    div {
      ol {
        li {
          text-align: left;
        }
      }
    }
  }
`;

const MoreContent = styled.div`
  min-height: 100vh;
  width: 70%;
  margin: 4rem auto;
  div {
    margin-bottom: 4rem;
    h2 {
      text-align: center;
      margin-bottom: 2rem;
      font-weight: 300;
      font-size: 3rem;
      letter-spacing: 2px;
      word-spacing: 2px;
    }
    ul {
      li {
        margin: 0.3rem 0;
        list-style-type: square;
        letter-spacing: 2px;
        line-height: 20px;
        font-size: 1.1rem;
        font-weight: 300;
        line-height: 25px;
        a {
          color: dodgerblue;
          text-decoration: none;
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;
{
  /* <div className="page-content">
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
      </div> */
}
