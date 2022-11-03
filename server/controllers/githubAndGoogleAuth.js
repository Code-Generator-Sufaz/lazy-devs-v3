function githubCallback (req, res) {
    const config = require('../../config')
    req.session.user = req.user
    res.redirect(config[config.model].frontEnd + '/profile');
}

function googleCallback (req, res) {
    req.session.user = req.user
    res.redirect(config[config.model].frontEnd + '/profile');
}
module.exports = { githubCallback, googleCallback }