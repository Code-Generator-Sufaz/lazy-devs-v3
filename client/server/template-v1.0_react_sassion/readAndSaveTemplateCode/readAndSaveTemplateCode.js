// This file is uesd to update templat
const db="mongodb+srv://dcigods:Cow36urSUXftwwXM@final-project.89hjjsk.mongodb.net/FormGen"
const fs = require('fs')
const {Schema, model} = require('mongoose')
const fixPath = require('./fixPath')

require('mongoose').connect(db).then(()=>console.log('MongoDB connect'))

const codeSchma = new Schema({
    server_js: String,
    app_js: String,
    server_package_json: String
})
const Code = model('code', codeSchma)


// read server.js
fs.readFile(fixPath(__dirname + '../server/server.js'), ((err,server_js)=>{
    // read app.js
    fs.readFile(fixPath(__dirname + '../client/src/App.jsx'), ((err,app_js)=>{
        // read package.json
        fs.readFile(fixPath(__dirname + '../server/package.json'), ((err,server_package_json)=>{
            // save to database
            new Code({server_js, app_js, server_package_json}).save()
            .then(result=>console.log(result))
            .catch(err=>console.log(err))
    
        }))
    
    }))

}))