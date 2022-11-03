function githubCallback (req, res) {
    req.session.user = req.user
    res.redirect('https://lazy-devs.onrender.com/profile');
}

function googleCallback (req, res) {
    req.session.user = req.user
    res.redirect('https://lazy-devs.onrender.com/profile');
}
module.exports = { githubCallback, googleCallback }