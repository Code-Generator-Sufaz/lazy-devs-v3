// contact us send emails
const sendContactuUsEmail = require('../models/Email')

const contactUsController = (req, res) =>{
    console.log('get a user message')

    sendContactuUsEmail(req.body)
    .then(data=>{
        res.json({
            mailSent: true
        })
    })
    .catch(err=>{
        res.json({
            mailSent: false
        })
    })

   
    

}

module.exports =  contactUsController