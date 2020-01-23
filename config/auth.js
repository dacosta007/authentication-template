// add middleware to any route that needs to be protected
module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please login to view your info');
    res.redirect('/users/login');
  }
}