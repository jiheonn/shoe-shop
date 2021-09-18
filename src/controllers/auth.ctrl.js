export default {
  index(req, res) {
    const message = req.flash('error')
    res.render('login', { message })
  },
  logout(req, res) {
    req.session.destroy()
    res.redirect('/')
  },
}
