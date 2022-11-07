const router = require('express').Router()
const contactUsController = require('../controllers/contactUsController')

app.post('/contact', contactUsController)

module.exports = router