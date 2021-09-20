const displayLogin = (req, res) => {
  const message = req.flash('error')
  res.render('login', { message })
}
const logout = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}

export default {
  displayLogin,
  logout,
}
