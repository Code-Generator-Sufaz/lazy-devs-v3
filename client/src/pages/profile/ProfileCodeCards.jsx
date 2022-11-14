import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import { Context } from "../../store/Context";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { BiShow } from "react-icons/bi";
import { BsTrash, BsDownload } from "react-icons/bs";
import { baseUrl } from "../../assets/api/api";
const ProfileCodeCards = () => {
  const [cards, setCards] = useState([]);
  const { setProfileTemplates, finalDataToSend } = useContext(Context);

  console.log(finalDataToSend);
  // set root json filev
  const rootJson = `{
    "name": "lazy_devs",
    "version": "1.0.0",
    "description": "user authentication template",
    "main": "",
    "scripts": {
      "start": "concurrently \\"npm run server\\" \\"npm run client\\"",
      "install_both": "concurrently \\"npm run i_server\\" \\"npm run i_client\\"",
      "i_server": "npm install --prefix server",
      "i_client": "npm install --prefix client",
      "server": "npm start --prefix server",
      "client": "npm start --prefix client"
    },
    "author": "sufaz",
    "license": "MIT",
    "dependencies": {
      "concurrently": "*"
    }
  }`;

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${baseUrl}/user/templates`);
        setCards(data.data.template);
        console.log(data.data.template);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  console.log();
  const showTemplateHandler = async (id) => {
    try {
      const data = await axios.get(`${baseUrl}/user/templates/${id}`);
      setProfileTemplates(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSavedTempHandler = async (id) => {
    try {
      const data = await axios.delete(`${baseUrl}/user/templates/${id}`);
      setCards((pre) => pre.filter((item) => item._id !== data.data._id));
    } catch (error) {}
  };
  const download = async (id) => {
    console.log(id);
    try {
      const data = await axios.get(`${baseUrl}/user/templates/download/${id}`);
      const zip = new JSZip();
      // console.log(data.data);
      zip.folder(data.data.templateName).file("README.md", readme)
      
      zip.folder(data.data.templateName).file("package.json", rootJson);
      zip
        .folder(data.data.templateName)
        .folder("client")
        .folder("src")
        .file("App.js", data.data.frontend);
      zip
        .folder(data.data.templateName)
        .folder("client")
        .folder("src")
        .file("index.js", indexJs);
      zip
        .folder(data.data.templateName)
        .folder("client")
        .folder("public")
        .file("index.html", indexHtml);
      zip
        .folder(data.data.templateName)
        .folder("server")
        .file("server.js", data.data.backend);

      zip
        .folder(data.data.templateName)
        .folder("client")
        .file("package.json", data.data.frontEndPackageJSON);

      zip
        .folder(data.data.templateName)
        .folder("server")
        .file("package.json", data.data.backendPackageJSON);
      zip
        .folder(data.data.templateName)
        .folder("server")
        .file(".env", data.data.backendDotenv);

      zip
        .generateAsync({
          type: "blob",
        })
        .then((content) => {
          saveAs(content, data.data.templateName);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ProfileCodeCardsWindow>
      {cards.length > 0 && (
        <h3 style={{ margin: "2rem 0 1rem" }}>Your previous work:</h3>
      )}
      {cards.map((card, index) => {
        return (
          <>
            <CodeCardBox>
              <p>{card.templateName}</p>
              <div style={{ width: "50%" }}>
                <div>
                  <Download
                    onClick={() => download(card._id)}
                    style={{ fontSize: "30px", fontWeight: "bold" }}
                  />
                </div>
                <div onClick={() => showTemplateHandler(card._id)}>
                  <Show style={{ fontSize: "30px", fontWeight: "bold" }} />
                </div>
                <div onClick={() => deleteSavedTempHandler(card._id)}>
                  <Trash style={{ fontSize: "30px", fontWeight: "bold" }} />
                </div>
              </div>
            </CodeCardBox>
            <CreatedAt>{moment(card.createdAt).fromNow()}</CreatedAt>
          </>
        );
      })}
    </ProfileCodeCardsWindow>
  );
};

export default ProfileCodeCards;

const ProfileCodeCardsWindow = styled.div`
  display: flex;
  flex-direction: column;
  width: 17rem;
  span {
    font-size: 14px;
    font-style: italic;
    color: white;
    align-self: flex-end;
    margin-bottom: 1rem;
  }
`;
const CodeCardBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-top: 1rem;
  width: 100%;
  height: 3rem;
  background: #3cc6ad;
  border-radius: 0.5rem;
  flex-basis: 1;
  position: relative;
  cursor: pointer;
  p {
    font-size: 16px;
    max-width: 50%;
    overflow: hidden;
  }
  div {
    display: flex;
    width: 5rem;
    height: 3rem;
    justify-content: space-between;
    align-items: center;
  }
`;
const Show = styled(BiShow)`
  transition: all 0.2s;
  &:hover {
    color: #fca311;
    transform: scale(1.1);
  }
`;

const Trash = styled(BsTrash)`
  transition: all 0.2s;
  &:hover {
    color: #fca311;
    transform: scale(1.1);
  }
`;
const Download = styled(BsDownload)`
  transition: all 0.2s;
  &:hover {
    color: #fca311;
    transform: scale(1.1);
  }
`;

const CreatedAt = styled.span`
  margin-top: 0.3rem;
  font-size: 0.5rem;
`;

const indexHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the \`public\` folder during the build.
      Only files inside the \`public\` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running \`npm run build\`.
    -->
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <title>lazy devs</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run \`npm start\` or \`yarn start\`.
      To create a production bundle, use \`npm run build\` or \`yarn build\`.
    -->
  </body>
</html>
`;

const indexJs = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
`;

const readme = `
# LAZY DEVS - OVERVIEW

Lazy Devs is an authentication tool for developers. It will create for you all the authentication backend and front-end forms that are necessary for a user to log in, register, and log out from your website.

## INTRODUCTION

Lazy Devs is an authentication tool for websites. Usually, developers spend 1 - 2 days on their authentication code, both on the front end and back end. This tool will create all the code for you. In our tool, we choose the most used packages and approaches by developers to create user authentication for their websites. In just a few clicks you can get it done, copy or download a zip folder, and you are all set! :D

## ADVANTAGES OF THE LAZY DEVS TOOL

- save time: usually, it takes 1-2 days of work to write an authentication backend and frontend code, with lazy devs you get it in less than a minute.
- Freedom to choose the best approach: As developers, we know that each and one of us has his own way of writing the code. After some research we’ve made, we chose the 3 most used approaches for authentication in a website and let you choose them.
- It's easy: instead of investing lots of time and energy in researching and implementing packages and methods, just a few clicks and you have it.
- Easy for beginners: Our tool is perfect for beginners. First, it will help them to get their website authentication fast and perfect, and also by doing that they can learn the most used methods of creating a user authentication and look deep into the code with small explanation comments that we added.

## GETTING STARTED
 
### Step One - create inputs

for registration or logging into a website we use inputs for getting the user data.

1. choose a name for your input.
2. select the input type you desire.
3. not mandatory, if you want the input to be unique or required turn the want validation switch to on and choose which one of them you want or all of them.
4. Click on Generate button, to generate your input.

### Step Two - choose which inputs to add for the login component

choose which inputs to add for the login component ( how will the user log in? Email & password ? Or email & username ? ) and select one of them to be the main input for the login component. automatically the first inputs you create will go to the registration component. in case you don't add any of them to login input our tool automatically will choose for you the first one you've created.

### Step Three - choose the auth method

when creating a user authentication there are many approaches. After some research, we've made we chose for you the 3 most used methods by developers for you to choose from. Just check one of them, and it will be implemented in your template.

- [SESSION](https://github.com/expressjs/session#readme)
- [JWT](https://jwt.io/introduction) & [COOKIE](https://github.com/jshttp/cookie) —> Token inside the cookie to authenticate the user.
- [JWT](https://jwt.io/introduction) & [AXIOS](https://axios-http.com/docs/intro) —> Token inside the header of the request.

### Step Four - Choose packages

Here you can choose if you want dotenv and nodemailer to be installed and implemented in your app.

- [DOTENV](https://www.npmjs.com/package/dotenv)
- [NODEMAILER](https://nodemailer.com/about/)

### Step five - Initializing your backend app

Usually when creating a nodeJS app we can initialize our app details, for example, author name, project description, and so on.. here you can fill up the form and get those details injected into your app.

### Step six - create the template

Click the CREATE TEMPLATE button and your finished template will appear on the right side of your screen.

### Step seven - NOT MANDATORY

If you want to save the template and get it whenever you need it you can register to our database and save your templates and review them whenever you need.

### Step eight - implementing your template in your code editor

Install dependencies in client and server repositories ( npm install in terminal in both repositories ) then npm start. For registered users, you can download a zip folder of your template.

1. Extract the project
2. Open terminal in project root folder(where you can see server folder and client folder)
3. Type \`\`\`npm install\`\`\` , enter, wait until installation finished
4. Type \`\`\`npm run install_both\`\`\` , enter, and wait till both installed. here you need to wait for both back-end & front-end to compile. front-end compile usually takes a little longer.
5. Type \`\`\`npm start\`\`\` , enter, now you can start your project

### Step nine - start your project based on the template you've created

## Some Template Logic

- When you want to use nodemailer, you must have an input with type == 'email'.
- Password will always get encrypted.
- Registration Inputs will be added to Schema, except type == 'button'
- If you put nothing in login inputs, the main input of registration inputs will be the login inputs (your first registration input will be the main input by default)

## Error Code For Running The Template

- {errCode: 0, data: error, path: 'encrypt.genSalt'}
- {errCode: 1, data: error, path: 'encrypt.hash'}
- {errCode: 2,data: error,path: 'compareEncryptData.compare',}
- {errCode: 3, data: error, path: 'jwtSign.sign.payload.obj'}
- {errCode: 4, data: error, path: 'jwtSign.sign.payload.str'}
- {errCode: 5, data: error, path: 'jwtVerify.verify'}
- {errCode: 20, data: error, path: 'mongodbSave.create'}
- {errCode: 21, data: error, path: 'mongodbUpdate.updateOne'}
- {errCode: 22, data: error, path: 'mongodbFindOne.findOne'}
- {errCode: 26, data: error, path: 'req.session.save'}
- {errCode: 11, data: { msg: 'email already used' }, path: 'create user'} // find the email address in DB
- { errCode: 12, data: error, path: 'nodemailer.sendEmail' }
- { errCode: 14, data: err, path: 'send verification email' }
- {errCode: 15, data: { msg: 'email not find' }, path: 'user login'}
- {errCode: 16, data: { msg: 'wrong password' }, path: 'user login'}
- {errCode: 17, data: { msg: 'wow something wrong' , ...err}, path: 'user logout'}
- {errCode: 18, data: { msg: 'wow something wrong' , ...err}, path: '/user/profile'}
- { errCode: 33, data: { msg: 'you need login first' }, path: 'middleware.auth' }
`